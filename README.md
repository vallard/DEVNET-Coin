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