var DEVNETCoin = artifacts.require("DEVNETCoin");

module.exports = function(deployer) {
  deployer.deploy(DEVNETCoin);
};
