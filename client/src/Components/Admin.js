import React, { Component } from "react";

import 'bootstrap/dist/css/bootstrap.min.css';
//import App from "../App"
class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
     // checked : false
    //  name: "React"
    };
    
  }
  
  
  render() {
    return( 
    <div className="Admin">
      
      
    <section id="func">
       <div class="row">
       <div id="admin" style={{marginLeft:"40%"}}>
         <br/>
         <h2 style={{color:"blue"}}>Admin Pannel</h2> 
         <div class="card shadow text-center border-0 mb-3">  
         <h5>KYC Whitelisting</h5>
                <div class="form-inline justify-content-center" >
               
                   <label class=" mb-2 my-2 my-sm-0"> Address To Allow : </label>
                    <input type="text" class="form-control mb-2 mr-sm-2 mb-sm-0"  style={{width:"300px"}} name ="kycAddress" placeholder="Enter Address here" value={this.props.kycAddress} onChange = {this.props.handleInputChange}></input>
                    <button class="btn btn-primary mb-2  my-2 my-sm-0" type="submit" onClick = {this.props.handleKycWhitelisting}>Add to Whitelist</button>
                </div>
               <br></br>
               </div>      
                
                <div class="form-inline justify-content-center">
                  
                    <input type="checkbox" class="form-control mb-2 mr-sm-2 mb-sm-0" style={{width:"50px"}} id="paused" name ="paused" onClick={this.props.handlePausable}></input>Pause ICO
                    <div style={{paddingLeft:"100px"}}>  Snapper Balance : {this.props.balance}
                  </div>
                </div>
                <br></br>
                <div style={{paddingLeft:"220px"}}>  Required Fund : {this.props.cap}
                  </div>
                <br></br> 
        
          
        </div>
                
           </div>     
         </section>
         <br></br>
        


<hr/><hr/>
        </div>
    );
  }
}

export default Admin;