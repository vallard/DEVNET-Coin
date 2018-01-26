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
