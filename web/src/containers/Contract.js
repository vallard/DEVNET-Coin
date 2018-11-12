import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getAddresses } from '../actions'
import Body from '../components/Body'
import VXT from '../components/VXT'
import Loading from '../components/Loading'
import Web3 from 'web3';
import * as contract from '../contract'

class Contract extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addresses : this.props.addresses || [],
      mm: "",
      provider: "",
      isConnected: false, 
      accounts: [],
      working: false,
      workingMessage: "Loading!"
    }
  
  }

  componentDidMount() {
    this.props.getAddresses()
    var t = this;
    window.addEventListener('load', async () =>  {
      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        try {
          t.setState({mm: "Please enable Metamask by signing in"})
          await window.ethereum.enable();
          t.validate(t)
        } catch (error) {
          t.setState({mm: "Metamask not enabled."})
        }
      }
      else if (typeof window.web3 !== 'undefined') {
        t.validate(t)
      }else {
        console.log("no web3 provided.")
      }
    })
  }


  // validate connection
  validate = (t) => {
    t.setState({isConnected: true})
    var p = new Web3(window.web3.currentProvider)
    t.setState({provider : p})
    console.log('MetaMask is installed')
    p.eth.getAccounts(function(err, acc) {
      if (err) {
        console.error(err)
        t.setState({mm: "error"})
        return
      }
      if (acc.length === 0) {
        t.setState({mm: "Metamask is locked"})
        return
      }
      t.setState({mm : "connected"})
      t.setState({accounts: acc});
    })
  }

  // function to buy DEVNETCoin
  buyCoin = () => {
    let t = this
    t.setState({working: true})
    t.setState({workingMessage: "Use Metamask to complete transaction"})
    let dncContract = new this.state.provider.eth.Contract(contract.abiArray, contract.address, { data: contract.bytecode });
    var eth = Web3.utils.toWei(".01", "ether")

    dncContract.methods.buyDEV().estimateGas(
      {
        from: t.state.accounts[0],
        value: eth.toString()
      }
    ).then(function(gasAmount) {
      var totalSend = parseInt(gasAmount, 10) + parseInt(eth,10)
      console.log("Sending: ", totalSend)
      dncContract.methods.buyDEV().send({
        from: t.state.accounts[0],
        value: totalSend
      }).then(function(receipt) {
        console.log("You bought DEVNET Coin!")
        console.log(receipt)
        t.setState({working: false})
      })
    })
    
  }
  

  // get more examples: https://github.com/katopz/web3-react-example/blob/master/src/App.js
  componentWillReceiveProps(nextProps) {
    console.log("Getting addresses")
    this.setState({
      addresses: nextProps.addresses || [],
    })
  }

  render() {
    return (
    <div>
      <Loading working={this.state.working} workingMessage={this.state.workingMessage}/>
      <Body mm={this.state.mm} buyCoin={this.buyCoin} address={contract.address}/>
      <VXT addresses={this.state.addresses}/>
    </div>
    )
  }
}


const mapStateToProps = (state, ownProps) => ({
  addresses: state.blockchain.addresses,
})

const mapDispatchToProps = (dispatch) => ({
  getAddresses: () => dispatch(getAddresses()),
})


export default connect(
  mapStateToProps,
  mapDispatchToProps)(Contract)
