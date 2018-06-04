# DEVNET|Coin Web 

This repository contains the website of [DEVNET|Coin](https://devnetcoin.com) as well as the [truffle](http://truffleframework.com) framework files for installation and building. 

We are running this on the [KOVAN](https://github.com/kovan-testnet/proposal) ethereum test network.  

## WebSite
This is a nodejs application.  We use web3js for connecting with the blockchain. 

We have also created a Dockerfile so the site can be updated quickly and easily.  

## Truffle

### Install Truffle

```
npm install -g truffle
```

### Compile the contract

The contract is located in ```contracts/devnetcoin.sol``` and can be compiled as follows: 

```
cd ~/<repo-root>
truffle compile
```

### Run the contract on test network

We can run the contract on our test network.  This is done by running: 

```
truffle develop
```

This creates 10 accounts and gives you private keys to interact with the network. 

We can then deploy the contract on the test network by running:

```
truffle migrate
```

We now have a contract living on the development network.  We can now interact with the contract on the console

```
d = DEVNETCoin.deployed()
```
Here we get a ton of information about our contract.  It is in the form: 

* constructor
* bytecode
* ABI
* Contract

Now let's see what is going on.  Tom is: 

```
dc.then(i => i.tom())
dc.then(i => i.val())
```
Here we get Val and Tom's address.  Now let's buy some with our test accounts.  Get all the accounts: 

```
var accounts;
web3.eth.getAccounts(function(err, res) { accounts = res});
```
We can now see all our accounts in: 

```
accounts
```

Now to buy some DEVNETCoin we run 

```
dc.then(i => i.buyDEV({from: accounts[0], value: web3.toWei(1, "ether"), gas: 40846, gasPrice: web3.toWei('20', "gwei")}))
```

(See below on Gas and Gas Price.)

#### Gas and GasPrice

In our contract we specified 40846 as the amount of Gas and set the Gas Price to 20 Gwei.  


__How do we know what the gas limit or gas price should be?__

__Gas__ is a unit or number of steps to be execute for your contract. Gas has fixed number of units for a specific operation/computation, this is fixed by Ethereum community. For example to add two numbers EVM consumes it may consumes 3 gas units.  You set a Gas Limit in your transaction to tell how many steps you are willing to take.  

To get basic fees to get some idea of how much gas, note the following:

* 32k gas to create a contract.
* 21k gas for normal transaction
* 200 gas * 1 byte of byte code.  
* Transaction data costs 64 for non-zero bytes and 4 for zero bytes
* Constructor cost

See this response on [Ethereum Stack Exchange](https://ethereum.stackexchange.com/questions/35539/what-is-the-real-price-of-deploying-a-contract-on-the-mainnet/37971). 


__VALUE__ field - The amount of wei to transfer from the sender to the recipient,

__GASPRICE__ value, representing the fee the sender is willing to pay for gas. One unit of gas corresponds to the execution of one atomic instruction, Gasprice will in wei. Wei is a smallest unit. (1 wei = 10^-18 ether or 10^18 wei = 1 ether

Total cost of transaction is ```Gas Limit * Gas Price```

Gas price fluctuates.  During normal times: 

* 40 GWEI will always get you in next block
* 20 GWEI will get you in the next few blocks
* 2 GWEI will get you in the next few minutes. 

Depends on what minors are willing to take.  

1x10^9 Gwei = 1 ether

See what the current gas price: 

```
web3.eth.gasPrice
```
This will be about 20 Gwei.  Or you can look to see what the Gas price is at the [ETH Gas Station](https://ethgasstation.info/).  The current price shown at the ETH Gas station is 11 Gwei (std) and 9 Gwei (safe low)

### Run the contract on infura test network


To deploy the network we use the Infura network.  This way we don't need to run a local blockchain on our server. For instructions on setting this up [see this guide](http://truffleframework.com/tutorials/using-infura-custom-provider).  

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

Once the contract is deployed we can now interact with it. 