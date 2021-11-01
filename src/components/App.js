import React, { useState, useEffect } from 'react';
import Content from './Content';
import Navibar from './Navibar';
import Web3 from 'web3';
import Tether from '../truffle_abis/Tether.json';
import BRT from '../truffle_abis/RWD.json';
import DecentralBank from '../truffle_abis/DecentralBank.json';
// import { useStickyState } from './Hook';

function App() {

  const storedVal = window.localStorage.getItem('account');

  const account = storedVal ? storedVal : '0x0';
  // eslint-disable-next-line
  const [tether, setTether] = useState({});
  // eslint-disable-next-line
  const [brt, setBRT] = useState({});
  // eslint-disable-next-line
  const [decentralBank, setDecentralBank] = useState({});
  const [tetherBal, setTetherBalance] = useState(0);
  const [brtBal, setBRTBalance] = useState(0);
  const [stakingBal, setStakingBal] = useState(0);
  const [loading, setLoading] = useState(true);

  // componentWillMount - hooks
  useEffect(() => {
    const loadWeb3 = async () => {
      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum)
        await window.ethereum.enable()
      }
      else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider)
      }
      else {
        window.alert('nuttn a gwaan')
      }
    };

    const loadChainData = async () => {
      const _web3 = window.web3;
      const accounts = await _web3.eth.getAccounts();
      console.log(accounts)
      window.localStorage.setItem('account', accounts);
      // setAccount(window.localStorage.getItem('account'));
      const _networkId = await _web3.eth.net.getId();

      // tether
      const tetherData = Tether.networks[_networkId];
      console.log(tetherData, 'tetherData');
      if (tetherData) {
        let _tether = new _web3.eth.Contract(Tether.abi, tetherData.address);
        setTether(_tether);
        let _tetherBalance = await _tether.methods.balances(account).call();
        setTetherBalance(_tetherBalance.toString());
      } else {
        window.alert('Error! tether contract not deployed!');
      }

      // brt
      const brtData = BRT.networks[_networkId];
      console.log(brtData, 'brtData');
      if (brtData) {
        let _brt = new _web3.eth.Contract(Tether.abi, brtData.address);
        setBRT(_brt);
        let _brtBalance = await _brt.methods.balances(account).call();
        setBRTBalance(_brtBalance.toString());
      } else {
        window.alert('Error! brt contract not deployed!');
      }

      // dBank
      const dBankData = DecentralBank.networks[_networkId];
      console.log(dBankData, 'dBankData');
      if (dBankData) {
        let _dBank = new _web3.eth.Contract(DecentralBank.abi, dBankData.address);
        setDecentralBank(_dBank);
        let _stakingBalance = await _dBank.methods.stakingBalance(account).call();
        setStakingBal(_stakingBalance.toString());
      } else {
        window.alert('Error! decentralBank contract not deployed!');
      }
      setLoading(false)
    };
    async function willMount() {
      await loadWeb3();
      await loadChainData();
    }
    willMount();
  }, [account])

  let stakingFunc = (amount) => {
    setLoading(true);
    console.log(decentralBank._address)
    tether.methods.approve(decentralBank._address, amount).send({ from: account }).on('transactionHash', (hash) => {
      decentralBank.methods.depositTokens(amount).send({ from: account }).on('transactionHash', (hash) => {
        setLoading(false)
      })
    })
  };
  let unstakingFunc = () => {
    setLoading(true)
    decentralBank.methods.unstakeTokens().send({ from: account }).on('transactionHash', (hash) => {
      setLoading(false)
    })
  };


  return (
    <div className="App">
      <Navibar heading="@0xreeko's Yield Farm" address={account} />
      {loading ? <p id="loader" className="text-center font-semibold">Loading...</p> : <Content usdtBal={Web3.utils.fromWei(tetherBal)} brtBal={Web3.utils.fromWei(brtBal)} stakeBal={Web3.utils.fromWei(stakingBal)} stake={stakingFunc} unstake={unstakingFunc} />}
    </div>
  )
}

export default App;
