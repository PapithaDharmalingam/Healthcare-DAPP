
const HealthCare = artifacts.require("HealthCare");

module.exports = function(deployer) {
  deployer.deploy(HealthCare);
};

