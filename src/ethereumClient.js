import Web3 from 'web3';
export var userEthereumClient;
if (typeof window.web3 !== 'undefined') {
    userEthereumClient = new Web3(window.web3);
  } else {
    // set the provider you want from Web3.providers
    userEthereumClient = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }
