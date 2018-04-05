var DEVNETCoin = artifacts.require("DEVNETCoin");

module.exports = function(deployer) {
  deployer.deploy(DEVNETCoin, "0xbfACeB2a712a9fEEff6C42e7BE0212F92b7F23dc",
    "0x0C64AF3B7dAa414ba8C8cb2B7b3c4be5fF8D0cc9");
};
