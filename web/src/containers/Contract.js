import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getAddresses } from '../actions'
import Body from '../components/Body'
import VXT from '../components/VXT'

class Contract extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addresses : this.props.addresses || [],
    }
  }

  componentDidMount() {
    
    this.props.getAddresses()
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
      <Body/>
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
