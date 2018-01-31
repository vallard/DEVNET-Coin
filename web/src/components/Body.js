import React from 'react'

const Body = () => (
    <div>
      <div className="jumbotron jumbotron-fluid">
        <div className="container">
          <h1 className="display-2">
            <center><b>DEVNET|</b>Coin
            </center>
          </h1>
          <hr className="my-4"/>
          <p className="lead">
            <center>Proof of Concept Crypto Currency Cisco Live 2018 
            </center>
          </p>
        </div>
      </div>
      <div className="container">
        <h2 className="page-header">Ready?</h2>
        <p className="lead">This is a proof of concept coin. If you buy this with real money you are wasting it.  But let's have some fun!
        </p>
        <ol>
          <li>Create a wallet on the <a href="https://github.com/kovan-testnet/proposal">kovan</a> test network.  This can be done by visiting <a href="https://www.myetherwallet.com">www.myetherwallet.com/</a> selecting the <b>Network Kovan</b> and creating the wallet.<br/>
          <i>Watch for phishing schemes here and make sure you are really on this website!  If you are protected by OpenDNS you are safe!</i></li> 
          <li>Get some of your own KETH!  This is done by going to the <a href="https://gitter.im/kovan-testnet/faucet">Keth Faucet</a>.  Put in your public address and they will send you 5 KETHs.  You're starting to get some real money now!</li>
          <li>If you are at Cisco Live then you can put this address into the Cisco Spark channel and we'll send you some DEVNET|Coin!</li>
        </ol>
      </div>
    </div>
);

export default Body
