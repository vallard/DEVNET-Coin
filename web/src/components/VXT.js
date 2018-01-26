import React from 'react'

const VXT = ({addresses}) => (
    <div className="container">
        <p></p>
        <h1 className="header">Token Holders</h1>
        <table className="table">
          <thead className="thead-dark">
            <th scope="col">#</th>
            <th scope="col">Contract</th>
            <th scope="col">Name</th>
            <th scope="col">Location</th>
            <th scope="col">URL</th>
          </thead>
          <tbody>
            { addresses.map( (a, index) => 
                //string iname, string loc, string Url, address add)
                Array.isArray(a) ?  
                  <tr key={a}>
                    <th scope="row">{ index }</th>
                    <td>{ a[3] }</td>
                    <td>{ a[0] }</td>
                    <td>{ a[1] }</td>
                    <td>{ a[2] }</td>
                  </tr>
                  :
                  <tr key={a}><th scope="row">{ a }</th></tr>
            )}
          </tbody>
        </table>
    </div>
);
export default VXT
