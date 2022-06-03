const Migrations = artifacts.require("Migrations");
const Marketplace = artifacts.require("Marketplace");
const Market = artifacts.require("Market");
const NFT = artifacts.require("NFT");

module.exports = function (deployer) {
  deployer.deploy(Market);
  deployer.deploy(Marketplace);
  deployer.deploy(NFT);
  deployer.deploy(Migrations);
};
