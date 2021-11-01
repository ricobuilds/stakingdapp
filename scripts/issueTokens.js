let decentralBank = artifacts.require('DecentralBank');

module.exports = async function issueBRT(callback) {
  let _decentralBank = await decentralBank.deployed();
  await _decentralBank.issueTokens();
  console.log("tokens issued succesfully");
  callback();
}