import React from 'react'

const VXT = ({addresses}) => (
    <div className="container">
      <p></p>
      <h1 className="header">Token Holders</h1>
      { addresses.length === 0 ? 
        <div className="row justify-content-center">
          <div className="col-sm-4">
            <div className="card loading">
              <div className="card-body">
                <h5 className="card-title">Fetching Token Holders from the Blockchain...</h5>
                <h1 className="display-1">
                  <i className="fa fa-circle-o-notch fa-spin"></i>
                </h1>
              </div>
            </div>
          </div>
        </div>
        :
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Address</th>  
              <th scope="col"># of Tokens</th>
            </tr>
          </thead>
          <tbody>
            { addresses.map( (a, index) => 
                //string iname, string loc, string Url, address add)
                Array.isArray(a) ?  
                  <tr  key={a}>
                    <th scope="row">{ index }</th>
                    <td><a href={"https://kovan.etherscan.io/address/" + a[0]} > {a[0]}</a></td>
                    <td>{a[1]}</td>
                  </tr>
                  :
                  <tr key={a}>
                    <th scope="row">{ index }</th>
                    <td>""</td>
                    <td>""</td>
                  </tr>
            )}
          </tbody>
        </table>
        }
    </div>
);
export default VXT
