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
          <div className="lead" >
            <center> 
              Proof of Concept Crypto Currency for Cisco Events in 2018 
            </center>
          </div>
        </div>
      </div>
      <div className="container">
        <h2 className="page-header">Ready?</h2>
        <p className="lead">This is a proof of concept coin. If you buy this with real money you are wasting it.  But let's have some fun!
        </p>
        <div className="card">
          <div className="card-body">
            <h2 className="card-title"><b>Step 1:</b> Get Metamask</h2>
            <p className="card-text">Think of Metamask as a simple bridge the Internet to the Ethereum network.  You download it as an extension to your web browser.
            </p>
            <a href="https://metamask.io" target="_blank">
              <img src="https://raw.githubusercontent.com/MetaMask/faq/master/images/download-metamask.png"/>
            </a>
          </div>
        </div>
        <ol>
          <li>To create a wallet, head over to the digital wallet site of you choice and create your wallet following their instructions. <a href="https://www.myetherwallet.com">MyEtherWallet</a> is a good pick - that way you can then import the account into MetaMask and view it from there, should you wish.</li>
          <li>DevNetCoin is on the <a href="https://github.com/kovan-testnet/proposal">Kovan Test Ethereum Network</a>. So you’ll need to get some KETH to buy some DevNetCoin. Using the public key of the account you just created, go to the <a href="https://gitter.im/kovan-testnet/faucet">Keth Faucet</a> and enter that public key. Once acknowledged, 5 KETH will be deposited into your account.</li>
          <li>Now send some of your KETH (1 KETH = 100 DevNetCoin) to the DevNetCoin Contract at the address: <a href="https://kovan.etherscan.io/token/0xc9e8db2294f6e74be82e4614e46413b41aa649b5">0xc9e8db2294f6e74be82e4614e46413b41aa649b5</a></li>
          <li>You’re now the proud owner of DevNetCoin! Congratulations!</li>
          <li>Want to waste real ethereum?  You can buy <a href="https://etherscan.io/token/0x41642b325a44df26357aad70f013d828f5adc52a">real DEVNETcoin</a> on the public network.  But really, you shouldn't do that.</li>
        </ol>
      </div>
    </div>
);

export default Body
