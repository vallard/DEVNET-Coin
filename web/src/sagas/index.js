import {put, all, takeEvery } from 'redux-saga/effects'
import Web3 from 'web3'
import * as actions from '../actions'
import getAbi from './abi'

//import blockchainAPI from '../services/blockchain'


export function* get_addresses() {
  //var w3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'));
  var w3 = new Web3(new Web3.providers.HttpProvider('https://kovan.infura.io/1r0bIX2eewb5e9m2WAug'));
  //var w3 = callWeb3MethodAsPromise( Web3.providers.HttpProvider, 'http://127.0.0.1:8545');
  // contract addrdss is:  0x52CB8F783468f4e60642aaa15a3466e026A30Eb3
  // contracdt address:  0x461f7eb8a0ffc0a0098c5eeedf52fa79af725616
  // 
  if(!w3.isConnected()) {
    return yield put(actions.gotError("not connected to blockchain"))
  } 

  var abiArray = getAbi(); 
  // https://medium.com/@tmyjoe/dapps-how-to-get-elements-of-array-in-a-contract-c61b16b6c438
  var MyContract = w3.eth.contract(abiArray);
  var contractAddress = "0xc9e8db2294f6e74be82e4614e46413b41aa649b5";
  var bank = MyContract.at(contractAddress);
  const numOfElements = bank.getAccountQuantity();
  console.log("number of elements = " + numOfElements)
  const results  = [];
  for (let i = 0; i < numOfElements; i++) {
    var addr = bank.accounts(i);
    const balance = bank.balanceOf(addr);
    
    console.log([addr, balance.c]);
    results.push([addr, balance.c]);
  }
  return yield put(actions.gotAddresses(results))
} 

export function* watchBlockchainRequest() {
  yield takeEvery(actions.GET_ADDRESSES, get_addresses)
}

export default function* rootSaga() {
  yield all([
    watchBlockchainRequest(),
  ])
}
