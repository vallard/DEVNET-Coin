pragma solidity ^0.4.21;

// Code borrowed and modified from https://theethereum.wiki/w/index.php/ERC20_Token_Standard
// Use is just an example for Cisco Live DEVNET class and is provided as is. 

library SafeMath {

    function add(uint a, uint b) internal pure returns (uint c) {
        c = a + b;
        require(c >= a);
    }

    function sub(uint a, uint b) internal pure returns (uint c) {
        require(b <= a);
        c = a - b;
    }

    function mul(uint a, uint b) internal pure returns (uint c) {
        c = a * b;
        require(a == 0 || c / a == b);
    }

    function div(uint a, uint b) internal pure returns (uint c) {
        require(b > 0);
        c = a / b;
    }
}


// ----------------------------------------------------------------------------

// ERC Token Standard #20 Interface

// https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20-token-standard.md

// ----------------------------------------------------------------------------

contract ERC20Interface {
    function totalSupply() public constant returns (uint);
    function balanceOf(address tokenOwner) public constant returns (uint balance);
    function allowance(address tokenOwner, address spender) public constant returns (uint remaining);
    function transfer(address to, uint tokens) public returns (bool success);
    function approve(address spender, uint tokens) public returns (bool success);
    function transferFrom(address from, address to, uint tokens) public returns (bool success);

    event Transfer(address indexed from, address indexed to, uint tokens);
    event Approval(address indexed tokenOwner, address indexed spender, uint tokens);

}

contract ApproveAndCallFallBack {
    function receiveApproval(address from, uint256 tokens, address token, bytes data) public;
}


contract DEVNETCoin is ERC20Interface {
    // add some function to uint to make it safe. 
    using SafeMath for uint;
    // information about the coin.
    string public name;
    string public symbol;
    uint8 public decimals;
    uint public _totalSupply;
    // people that own our coin.
    address[] public accounts;
    mapping(address => uint256) balances;
    // mapping of who can withdraw from who.
    mapping(address => mapping(address => uint)) allowed;
    mapping(address => uint) pendingWithdrawals;
    address public val;
    address public tom;

    // Constructor when contract is created. 
    function DEVNETCoin(address _val, address _tom ) public {
      name = "DEVNET|Coin";
      symbol = "DEV";
      decimals = 18;
      _totalSupply = 20000000 * 10**uint(decimals);
      val = _val;
      tom = _tom;
      balances[val] = _totalSupply / 4;
      balances[tom] = _totalSupply / 4;
      accounts.push(val);
      accounts.push(tom);
      emit Transfer(address(0), val, _totalSupply / 4);
      emit Transfer(address(0), tom, _totalSupply / 4);
    }

    // get item count
    function getAccountQuantity() public constant returns (uint count) {
      return accounts.length;
    }

    // get the total supply 
    function totalSupply() public constant returns (uint) {
      return _totalSupply - balances[address(0)];
    }

    // get the token balance for a token owner.
    function balanceOf(address tokenOwner) public constant returns (uint balance) {
      return balances[tokenOwner];
    }

    // send tokens from one account to another address. 
    function transfer(address to, uint tokens) public returns (bool success) {
      // notice we use the safemath here 
      //tokens = tokens;
      balances[msg.sender] = balances[msg.sender].sub(tokens);
      balances[to] = balances[to].add(tokens);
      emit Transfer(msg.sender, to, tokens);
      return true;
    }

    // approve someone to be able to transfer tokens from your account. 
    function approve(address spender, uint tokens) public returns (bool success) {
      allowed[msg.sender][spender] = tokens;
      emit Approval(msg.sender, spender, tokens); 
      return true;
    }
   
    // called by the person claiming the tokens.   
    function transferFrom(address from, address to, uint tokens) public returns (bool success) {
      balances[from] = balances[from].sub(tokens);
      allowed[from][msg.sender] = allowed[from][msg.sender].sub(tokens);
      balances[to] = balances[to].add(tokens);
      emit Transfer(from, to, tokens);
      return true;
    }

    // returns the amount of tokens approved by the owners that can be transferred to 
    // the spender's account. 
    function allowance(address tokenOwner, address spender) public constant returns (uint remaining) {
      return allowed[tokenOwner][spender];
    }
 
    function approveAndCall(address spender, uint tokens, bytes data) public returns (bool success) {
      allowed[msg.sender][spender] = tokens;
      emit Approval(msg.sender, spender, tokens);
      ApproveAndCallFallBack(spender).receiveApproval(msg.sender, tokens, this, data);
      return true;
    } 

   
    function buyDEV() public payable {

        uint tokensRemaining = _totalSupply;
        uint tokensBought = 0;
        require(_totalSupply > 0);
        uint etherReceived = msg.value; 
        
        if (tokensRemaining >= etherReceived * 100) {
          tokensBought = etherReceived * 100;
          tokensRemaining -= etherReceived;
        } else {
          tokensBought = tokensRemaining;
          tokensRemaining = 0;
        }
        // make sure sender doesnt already exist.  If they don't, add new.  

        if (balances[msg.sender] == 0) {
          accounts.push(msg.sender);
        }
        
        balances[msg.sender] = balances[msg.sender] + tokensBought;
  
      
        emit Transfer(address(0), msg.sender, tokensBought);

        pendingWithdrawals[val] += msg.value / 2;
        pendingWithdrawals[tom] += msg.value / 2;
    } 

    // if people want to buy eth then we will send them tokens. 
    function () public payable {
      buyDEV();
    }

    // give all them money to val or tom
    function withdraw() public {
      uint amount  = pendingWithdrawals[msg.sender];
      pendingWithdrawals[msg.sender] = 0;
      msg.sender.transfer(amount);
    }

    modifier usOnly() {
      require(msg.sender == val || msg.sender == tom);
      _;
    }
    
    function kill() public usOnly {
      selfdestruct(val);
    }
}

