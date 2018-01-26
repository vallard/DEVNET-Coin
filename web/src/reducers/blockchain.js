import {
  GOT_ADDRESSES,
  BLOCKCHAIN_ERROR
} from '../actions'

const blockchain = (state = {
  addresses: [],
  error: "",
  }, action) => {
  switch (action.type) {
    case GOT_ADDRESSES:
      return Object.assign({}, state, {
        addresses: action.addresses
      })
    case BLOCKCHAIN_ERROR: 
      return Object.assign({}, state, {
        error: action.error
      })
    default:
      return state
  }
}
export default blockchain
