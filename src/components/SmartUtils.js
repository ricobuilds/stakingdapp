// import Web3 from 'web3';

// export let loadWeb3 = async () => {
//   // check for metamask
//   if (window.ethereum) {
//     window.web3 = new Web3(window.ethereum);
//     await window.ethereum.enable();
//   } else if (window.web3) {
//     window.web3 = new Web3(window.web3.currentProvider);
//   }
//   else {
//     window.alert("Nuttn nuh gwaan");
//   }
// }

// // loads chain data
// export let loadChainData = async () => {
//   let _web3 = window.web3;
//   let _account = await _web3.eth.getAccounts();
//   console.log(`accountHex:`, _account);
// }

// // chops up the wallet address to prevent exposure
// export let chopAddress = (variable) => {
//   let chopped = variable.split('');
// }
