import {put, all, takeEvery } from 'redux-saga/effects'
import Web3 from 'web3'
import * as actions from '../actions'
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

  var abiArray = [
	{
		"constant": true,
		"inputs": [
			{
				"name": "id",
				"type": "uint16"
			}
		],
		"name": "getItem",
		"outputs": [
			{
				"name": "iname",
				"type": "string"
			},
			{
				"name": "loc",
				"type": "string"
			},
			{
				"name": "Url",
				"type": "string"
			},
			{
				"name": "add",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "countItemList",
		"outputs": [
			{
				"name": "count",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "name",
				"type": "string"
			},
			{
				"name": "url",
				"type": "string"
			},
			{
				"name": "val",
				"type": "string"
			},
			{
				"name": "Add",
				"type": "address"
			}
		],
		"name": "addItem",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "id",
				"type": "uint16"
			}
		],
		"name": "removeItem",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	}
] ;
  // https://medium.com/@tmyjoe/dapps-how-to-get-elements-of-array-in-a-contract-c61b16b6c438
  var MyContract = w3.eth.contract(abiArray);
  var contractAddress = "0x72487018a021e66fdd3f18c92f4575faffed9e36";
  var registry = MyContract.at(contractAddress);
  const numOfElements = registry.countItemList();
  console.log("number of elements = " + numOfElements)
  const results  = [];
  for (let i = 0; i < numOfElements; i++) {
    const elem = registry.getItem(i);
    console.log(elem);
    results.push(elem);
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
