var DEVNETCoin = artifacts.require("DEVNETCoin");

module.exports = function(deployer) {
  deployer.deploy(DEVNETCoin, "0xbfACeB2a712a9fEEff6C42e7BE0212F92b7F23dc",  "0xD9bbe649B3C2c7a6ef26dfF9336E1e74d599B9a8");
};
