# DEVNET|Coin Web 

This repository contains the website of [DEVNET|Coin](https://devnetcoin.com) as well as the [truffle](http://truffleframework.com) framework files for the contract used for installation and building. 
  

## WebSite
This is a nodejs application.  We use web3js for connecting with the blockchain. 

We have also created a Dockerfile so the site can be updated quickly and easily.  

This is all done in the web directory

## Truffle

The rest of the repository is for truffle.  This README will go over how to deploy truffle and how to use it to test the contract.

### Install Truffle

If you don't have Truffle installed, install it now. 

```
npm install -g truffle
```

## Working With DEVNETCoin

Let's explore this contract and show how we use the command line, the test suite, and other networks to perform certain actions.  

The contract is located in ```contracts/devnetcoin.sol``` and can be compiled as follows: 

```
cd ~/<repo-root>
truffle compile
```

### Run the contract on test network

We can run the contract on a test network.  This test network is embedded in the Truffle framework.  This is done by running: 

```
truffle develop
```

This creates 10 accounts and gives you private keys to interact with the network. 

We can then deploy the contract on the test network by opening up another shell and running:

```
truffle migrate
```

We now have a contract living on the development network.  We can interact with the contract on the console

```
var d = DEVNETCoin.deployed()
```

Here we get a ton of information about our contract.  It is in the form: 

* constructor
* bytecode
* ABI
* Contract

Now let's see a little more of what is going on.  To see the addresses used in the constructor, we can do: 

```
d.then(i => i.tom())
d.then(i => i.val())
```

These addresses however, do not correspond to our local test network! 

This is because the migration file, encodes two accounts that are not found on our infura test network.  We would like to spin up a different DEVNETCoin contract with two of our test account addresses.  Let's do that. 

Let's get all the accounts

```
var accounts;
web3.eth.getAccounts(function(err, res) { accounts = res});
```
We can now see all our accounts in: 

```
accounts
```

Let's assign a few actors:

```
let val = accounts[0]
let tom = accounts[1]
let hank = accounts[2]
```

Now let's create a new DEVNETCoin and assign ```val``` and ```tom``` in the constructor: 

```
d = DEVNETCoin.new(val, tom)
```


Now let's let Hank buy some DEVNETCoin.  To do that let's run: 

```
 d.then(i => i.buyDEV({from: hank, value: web3.toWei(20, "ether"), gas: 408460, gasPrice: web3.toWei('20', "gwei")}))
```

We can see in the output that the amount of Gas used was ```111824``` and the rest is refunded.  The Gas Price was the 20 gwei that we sent.

(See below on Gas and Gas Price.)

Let's look at the values of the accounts.  To get how much Eth is in ```hank```s account we run: 

```
web3.eth.getBalance(hank).toString()
```

To see how many tokens ```hank``` has we can do: 

```
var hankBalance
d.then(i => hankBalance = i.balanceOf(hank))
hankBalance.then(i => web3.fromWei(i, 'ether').toString())
```

We can run similar functions on ```val``` and ```tom```.  But another intersting thing that happens in this contract is that when ```hank``` buys DEVNETCoin, the Ether gets divided into the ```val``` and ```tom``` account.  We can now have ```val``` withdraw his account.  This is done by running: 

```
web3.fromWei(web3.eth.getBalance(val).toString(), 'ether').toString()
d.then(i => i.withdraw({sender: val}))
web3.fromWei(web3.eth.getBalance(val).toString(), 'ether').toString()
```
Here you'll see that ```val```'s balance went up by half of what ```hank``` put in.  The same happened with ```tom```'s account.  


#### Gas and GasPrice

When we created our contract you may be wondering about the ```gas``` and ```gasPrice``` we used.  Let's explain a little more about that now. 


__Gas__ is a unit or number of steps to be execute for your contract. Gas has fixed number of units for a specific operation/computation, this is fixed by Ethereum community. For example to add two numbers EVM consumes it may consumes 3 gas units.  You set a Gas Limit in your transaction to tell how many steps you are willing to take.  

To get basic fees to get some idea of how much gas, note the following:

* 32k gas to create a contract.
* 21k gas for normal transaction
* 200 gas * 1 byte of byte code.  
* Transaction data costs 64 for non-zero bytes and 4 for zero bytes
* Constructor cost

See this response on [Ethereum Stack Exchange](https://ethereum.stackexchange.com/questions/35539/what-is-the-real-price-of-deploying-a-contract-on-the-mainnet/37971). 

The limit of computation per block is not constant.  Miners can set this.  


__VALUE__ field - The amount of wei to transfer from the sender to the recipient, this is the value we are going to send to either another user or to a contract. 

__GASPRICE__ value, representing the fee the sender is willing to pay for gas. One unit of gas corresponds to the execution of one atomic instruction, Gasprice is in wei. Wei is a smallest unit. (1 wei = 10^-18 ether or 10^18 wei = 1 ether.  Because it is quite high, we use ```gwei```.  ```1 gwei = 1,000,000,000 wei.```

Total cost of transaction is ```Gas Limit * Gas Price```

Gas price fluctuates.  During normal times: 

* 40 GWEI will always get you in next block
* 20 GWEI will get you in the next few blocks
* 2 GWEI will get you in the next few minutes. 

Depends on what minors are willing to take.  

```1 ether = 1,000,000,000 gwei```

See what the current gas price: 

```
web3.eth.gasPrice
```
This will be about 20 Gwei.  Or you can look to see what the Gas price is at the [ETH Gas Station](https://ethgasstation.info/).  The current price shown at the ETH Gas station is 11 Gwei (std) and 9 Gwei (safe low)

### Run the contract on infura test network

Now that we've done all these exercises on the local development network, we can deploy it to a public chain like the Infura network.  This is a little more like real life and allows multiple actors in a test environment.  

For instructions on setting this up [see this guide](http://truffleframework.com/tutorials/using-infura-custom-provider).  

We use environment variables to set the ```truffle.json``` file.  These environment variables are:

```
export INFURA_MNEMONIC="close door open mouth..."
export INFURA_SERVER="https://kovan.infura.io/<your key>"
```

Once these are set you can deploy the contract on the network with: 

```
truffle migrate --network kovan
```

Notice the configuration file we use for the ```truffle.json``` file where we specify this network: 


```json
var HDWalletProvider = require("truffle-hdwallet-provider");
var mnemonic = process.env.INFURA_MNEMONIC;
var server = process.env.INFURA_SERVER;
module.exports = {
  networks: {
    kovan: {
      provider: function() {
        return new HDWalletProvider(mnemonic, server);
      },
      network_id: 42
    }
  }
};
```

Once the contract is deployed we can now interact with it as we did before.  To open up a console we run: 

```
truffle console --network kovan
```

Now we can run all those steps above (except the new one) using accounts we have available on that test networks.  Metamask can help as well. 

### Running Test Cases

The nice thing about Truffle is we can automate all those steps of creating a new contract, having ```hank``` buy the devnetcoin, and making sure ```tom``` and ```val``` reap the profits of their cool DEVNET coin.  This is as simple as running

```
truffle test
```
in the main network.  This makes it so we can modify the contract and then find ways to add functions and ensure that everything acts the way it is supposed to!