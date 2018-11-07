import {put, all, takeEvery } from 'redux-saga/effects'
import Web3 from 'web3'
import * as actions from '../actions'
import * as contract from '../contract'

//import blockchainAPI from '../services/blockchain'


export function* get_addresses() {
  const results  = [];
  // create new w3 connection
  var w3 = new Web3(new Web3.providers.HttpProvider('https://kovan.infura.io/1r0bIX2eewb5e9m2WAug'));
  var bank = new w3.eth.Contract(contract.abiArray, contract.address)
  const numOfElements = yield bank.methods.getAccountQuantity().call()
  console.log("number of elements = " + numOfElements)
  for (let i = 0; i < numOfElements; i++) {
    var addr = yield bank.methods.accounts(i).call();
    const balance = yield bank.methods.balanceOf(addr).call();
    results.push([addr, Web3.utils.fromWei(balance, 'ether')]);
    //yield put(actions.gotAddresses(results))
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
