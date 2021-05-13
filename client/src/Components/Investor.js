import React, { Component } from "react";


class Investor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    //  name: "React"
    };
    this.copyclipboard = this.copyclipboard.bind(this);
  }
  copyclipboard() {
    
    /* Get the text field */
    var copyText = document.getElementById("owneraddress");
  
    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /* For mobile devices */
  
    /* Copy the text inside the text field */
    document.execCommand("copy");
  
    /* Alert the copied text
    alert("Copied the text: " + copyText.value); */
  }
  render() {
   
    return( 
      
    <div className="Investor">


          <div id="inv" style={{marginLeft:"30%"}}> 
          <h2 style={{color:"blue"}}>Investor Pannel</h2>
          <div class="card shadow text-center border-0 mb-3">         
                  <h5>For Buying More Token</h5>
                      <div class = "form-inline justify-content-center">         
                        <label class=" mb-2 my-2 my-sm-0">EOA Address : </label>
                            <div>
                                <input type="text" id="owneraddress" name="owneraddress" class="form-control mb-2 mr-sm-2 mb-sm-0" style={{ width:"400px",backgroundColor:"transparent", border:"none", borderBottom:"1px solid blue"}} value= {this.props.tokenSaleAddress} readOnly/>
                                  <button class="btn btn-primary" type="button" onClick={this.copyclipboard}>copy</button>
                                
                            </div> 
                        </div>
                        </div>
                      <div class = " justify-content-center">
                       {/* <label class=" mb-2 my-2 my-sm-0"><h3>You currently have  :{this.state.userTokens} Tokens</h3> </label> */}
                          <br></br>
                        <button class="btn btn-primary mb-2  my-2 my-sm-0" type="button" onClick={this.props.handleBuyTokens}>Buy Tokens Now</button>
                        </div>
                  </div>
         


        <div class="h1 text-primary" style={{paddingLeft:"40%"}}> Transaction Logs</div>
        <section>
    <div style={{marginLeft:"30%"}} >
                <div class="table-responsive">
                <table class="table caption-top">
              
                    <thead>
                        <tr>
                            <th>Recipient</th>
                            <th>To</th>
                            <th>Value</th>
                            <th>No. Tokens</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.transactions.map((tx, index) => {
                            return (
                                <tr key={index}>
                                    <td>{tx.returnValues.to}</td>
                                    <td>{this.props.tokenSaleAddress}</td>
                                    <td>{window.web3.utils.fromWei(tx.returnValues.value.toString(), 'Ether')}</td>
                                    <td style={{color:"green"}}>{this.props.userTokens}</td>
                                    
                                </tr>
                            )
                        })}
                       
                    </tbody>
                </table>
                </div>
            </div >
</section>








    </div>
    );
  }
}

export default Investor;