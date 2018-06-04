var DEVNETCoin = artifacts.require("DEVNETCoin");

contract(DEVNETCoin, function(accounts) {
  let val = accounts[0]
  let tom = accounts[1]
  let hank = accounts[2]

  beforeEach(async  ()  => {
    devnetcoin = await DEVNETCoin.new(val, tom);
  });

  it("Should give DEVNET coin to Tom and Val when created.", async () => {
    try {
      let vBal = await devnetcoin.balanceOf(val);
      let tBal = await devnetcoin.balanceOf(tom);
      vString = web3.fromWei(vBal, 'ether').toString();
      console.log(vString);
      console.log('5000000');
      assert.equal(vString, '5000000', 'Val did not receive 5 million devnet coin.')
    }catch (e) {
      assert.fail(null, null, `${e}`)
    }
  })

  it("Should let Hank buy 100 DEVNET Coin with 1 ether.", async () => {
    try {
      result = await devnetcoin.buyDEV({from: hank,
                        value: web3.toWei(1, "ether"),
                        gas: 508460,
                        gasPrice: web3.toWei('20', "gwei")})
      let hBal = await devnetcoin.balanceOf(hank)
      console.log(web3.fromWei(hBal, 'ether').toString());
      assert.equal(hBal, web3.toWei(100, 'ether'), "Hank did not receive 100 DEVNET Coin") 
    }catch (e) {
      assert.fail(null, null, `${e}`)
    }
    
  })

  it("Should have a total supply of 20,000,000.", async () => {
    try {
      let totalSupply = await devnetcoin.totalSupply()
      assert.equal(web3.toWei("20000000", "ether") - totalSupply, 0, "There were not 20 million DEVNET tokens in supply");
      console.log(web3.fromWei(totalSupply, 'ether').toString())
    }catch (e) {
      assert.fail(null, null, `${e}`)
    }
  })

  it("Should let Val withdraw 0.5 ether that he got from Hank", async () => {
    try {
      let beforeBal = web3.eth.getBalance(val);
      console.log(web3.fromWei(beforeBal, "ether").toString())
      await devnetcoin.withdraw({sender: val})
      let afterBal = web3.eth.getBalance(val);
      console.log(web3.fromWei(afterBal, "ether").toString())
    }catch (e){

    }
  })
  
})
