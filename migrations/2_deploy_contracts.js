const Todolist = artifacts.require("Todolist");

module.exports = function (deployer) {
  deployer.deploy(Todolist);
};
