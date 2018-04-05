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
              Proof of Concept Crypto Currency Cisco Live 2018
            </center>
          </div>
        </div>
      </div>
      <div className="container">
        <h2 className="page-header">Ready?</h2>
        <p className="lead">This is a proof of concept coin. If you buy this with real money you are wasting it.  But let's have some fun!
        </p>
        <ol>
          <li>First, it’s a good idea to install the <a href="https://metamask.io">MetaMask</a> plugin on your browser. It gives you a single place to access your wallets (which you will create next) and also warns you if you go to any phishing sites by mistake - and there’s plenty of them!</li>
          <li>To create a wallet, head over to the digital wallet site of you choice and create your wallet following their instructions. <a href="https://www.myetherwallet.com">MyEtherWallet</a> is a good pick - that way you can then import the account into MetaMask and view it from there, should you wish.</li>
          <li>DevNetCoin is on the Kovan Test Ethereum Network. So you’ll need to get some KETH to buy some DevNetCoin. Using the public key of the account you just created, go to the <a href="https://gitter.im/kovan-testnet/faucet">Keth Faucet</a> and enter that public key. Once acknowledged, 5 KETH will be deposited into your account.</li>
          <li>Now send some of your KETH (1 KETH = 100 DevNetCoin) from your wallet to the DevNetCoin Contract at the address: <a href="https://kovan.etherscan.io/token/0xc9e8db2294f6e74be82e4614e46413b41aa649b5">0xc9e8db2294f6e74be82e4614e46413b41aa649b5</a></li>
          <li>You’re now the proud owner of DevNetCoin! Congratulations!</li>
        </ol>
      </div>
    </div>
);

export default Body
