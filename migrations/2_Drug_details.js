const Drug_details = artifacts.require("Drug_details");

module.exports = function(deployer) {
  deployer.deploy(Drug_details);
};