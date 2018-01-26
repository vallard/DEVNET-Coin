export const GOT_ADDRESSES = 'GOT ADDRESSES'
export const GET_ADDRESSES = 'GETTING ADDRESSES'
export const BLOCKCHAIN_ERROR = 'BLOCKCHAIN ERROR'

export const gotAddresses = (addresses) => ({
  type: GOT_ADDRESSES, 
  addresses
})

export const getAddresses = () => ({
  type: GET_ADDRESSES,
})

export const gotError = (error) => ({
  type: BLOCKCHAIN_ERROR,
  error
})
