var HDWalletProvider = require("truffle-hdwallet-provider");
var mnemonic = process.env.INFURA_MNEMONIC;
var server = process.env.INFURA_SERVER;
module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 9545,
      network_id: 43
    },
    kovan: {
      provider: function() {
        return new HDWalletProvider(mnemonic, server);
      },
      network_id: 42
    },
    mainnet: {
      provider: function() {
        return new HDWalletProvider(mnemonic, main_server);
      },
      network_id: 41
    }
  }
};
