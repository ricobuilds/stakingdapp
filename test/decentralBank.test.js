// const { assert } = require('console');

const Tether = artifacts.require("Tether");
const RWD = artifacts.require("RWD");
const DecentralBank = artifacts.require("DecentralBank");

require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('DecentralBank', ([owner, customer]) => {

  let tether, brt, decentralBank

  function tokens(number) {
    return web3.utils.toWei(number, 'ether');
  }

  before(async () => {
    // load up the contracts
    tether = await Tether.new();
    brt = await RWD.new();
    decentralBank = await DecentralBank.new(brt.address, tether.address);

    await brt.transfer(decentralBank.address, tokens('1000000'))
    
    await tether.transfer(customer, tokens('100'), { from: owner })
  })


  describe('Mock tether deployment', async () => {
    it('tether name matches succesfully', async () => {
      const name = await tether.name();
      assert.equal(name, 'Tether');
    })
  })

  describe('BRT token', async () => {
    it('brt name matches succesfully', async () => {
      const name = await brt.name();
      assert.equal(name, 'Basic Reward Token');
    })
  })

  describe('USDT symbol', async () => {
    it('brt symbol matches succesfully', async () => {
      const _symbol = await tether.symbol();
      assert.equal(_symbol, 'USDT');
    })
  })

  describe('BRT symbol', async () => {
    it('brt symbol matches succesfully', async () => {
      const _symbol = await brt.symbol();
      assert.equal(_symbol, 'BRT');
    })
  })
  
  describe('BRT symbol', async () => {
    it('brt symbol matches succesfully', async () => {
      const _symbol = await brt.symbol();
      assert.equal(_symbol, 'BRT');
    })
  })

  describe('dBank deployment', async () => {
    it('matches dapp name succesfully', async () => {
      const _name = await decentralBank.name();
      assert.equal(_name, 'Decentral Bank');
    })

    it('has contract tokens', async () => {
      // didn't put 'decentralBank' but 'DecentralBank' so it didn't register.
      // also had 'balancesOf' which would only work if it matches the balance mapping
      // this seems to be because Solidity creates functions out of public types
      // so it makes sense when one calls THAT function out of the contract.
      let _balance = await brt.balances(decentralBank.address)
      assert.equal(_balance, tokens('1000000'))
    })
  })

  describe('_yieldFarming_', async () => {
    it('rewards BRT for staking USDT succesfully', async () => {
      let result

      result = await tether.balances(customer);
      assert.equal(result.toString(), tokens('100'), 'degen mock balance before staking 100');
      
      await tether.approve(decentralBank.address, tokens('100'), { from: customer });
      await decentralBank.depositTokens(tokens('100'), { from: customer });
      
      result = await tether.balances(customer);
      assert.equal(result.toString(), tokens('0'), "degen mock balance after staking 100");
      
      result = await tether.balances(decentralBank.address);
      assert.equal(result.toString(), tokens('100'), "degen bank balance after staking by customer");
      
      result = await decentralBank.isStaking(customer)
      assert.equal(result.toString(), 'true', "staking status == true");

      await decentralBank.issueTokens({from: owner})
      await decentralBank.issueTokens({from: customer}).should.be.rejected

      await decentralBank.unstakeTokens({ from: customer })

      result = await tether.balances(customer);
      assert.equal(result.toString(), tokens('100'), "degen mock balance after unstaking 100");
      
      result = await tether.balances(decentralBank.address);
      assert.equal(result.toString(), tokens('0'), "degen bank balance after unstaking by customer");
      
      result = await decentralBank.isStaking(customer)
      assert.equal(result.toString(), 'false', "staking status == false");
    })

  })

  })