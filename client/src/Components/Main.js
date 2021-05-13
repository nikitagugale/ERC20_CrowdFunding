import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPoll,faFunnelDollar,faCommentsDollar,faCommentDollar,faCalendarWeek,faCertificate,faGlobe, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import {faEthereum,faRavelry,faReplyd,faLinkedin, faYoutube, faFacebook,faTwitter} from "@fortawesome/free-brands-svg-icons";
import { Doughnut} from 'react-chartjs-2';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../CSS/Main.css";
const option ={
  labels: ['Admin', 'Partner', 'BoardMember', 'Investor'],
  datasets: [{
      label: 'Vesting Tokens',
      data: [12, 19, 3, 5,],
      backgroundColor: [
          'rgba(83, 51, 237, 1)',
          'rgba(44, 130, 201, 1)',
          'rgba(58, 83, 155, 1)',
          'rgba(197, 239, 247, 1)',
          
      ],
      borderColor: [
          'rgba(83, 51, 237, 1)',
          'rgba(44, 130, 201, 1)',
          'rgba(58, 83, 155, 1)',
          'rgba(197, 239, 247, 1)',
          
      ],
      borderWidth: 1
  }]
  }
class Main extends Component {
  constructor(props) {
    
    super(props);
    this.state = {
    
      showPopup: false
     
    };
  }
  
 
  
   
    togglePopup() {
      this.setState({showPopup: !this.state.showPopup}); 
    }
   
  
 render() {
    return( 
    <div className="Main">
        <section id="slideshow" style={{height: "150px",
          backgroundImage: `linear-gradient(blue , cyan)`}}>
		      <section id="content">
			          <h3>Let's Invest And Grow Together</h3> 
		      </section>
        </section>
        <section>
	        <div id="activeico">	<br></br>
					<div class="card shadow text-center border-0 mb-3 " style={{width:"20rem", height:"50rem"}}>
  						<div class="card-header border-0 mb-3">
							  <center><h3 style={{color: "blue"}}>Snapper Future Tech</h3></center>
  						</div>
 						  <div class="card-body">
                <ul><center><a href="/" class="btn btn-outline-primary" style={{paddingLeft:"3px"}} onClick = {this.props.handleBuyTokens}>Buy now</a>
							  <button class="btn btn-outline-primary" style={{marginLeft:"5px"}} onClick={this.togglePopup.bind(this)}>About Token</button></center></ul>
    						<p class="card-text">Snapper Future Tech is a global services & technology products company, leading digital transformation for enterprises using blockchain. It offers services in Blockchain application development, training & consulting and an innovative suite of specialised products for e-Governance, Financial Services, Insurance, Sustainable Supply Chain & Healthcare. Established in 2017 in Pune, Snapper Future Tech has raised Pre-Seed and Seed rounds through Enemtech Capital and strategic investors globally. A Hyperledger Certified Service Provider (HCSP) & Training partner (HTP), the company participates in open-source initiatives across the globe & has robust technological alliances & partnerships with Hyperledger, Oracle, Amazon Web Services, IBM, Trust over IP & Sovrin.</p>
    					</div>
  						<div class="card-footer  border-0 mb-3">
							  <center><small>Start date :<b> {this.props.start}</b> </small></center>      <center><small> End date: <b>{this.props.end}</b></small></center>
  						</div>
					  </div>
    </div>
    
          <div class="row" style={{marginLeft:"50%",paddingTop:"50px"}}>
            <div class="card-deck">
             <div class="card shadow border-primary h-90 py-2 btn" style={{width:"300px"}}>
                <button class="border-0 bg-white">
                    
                    <div class="card-body">
                    <div class="text-xs  mb-1"> <a href="/Admin">Admin</a></div>
                  </div>
                </button>
             </div>
          
              <div class="card shadow border-primary h-90 py-2">
               <button class="border-0 bg-white">
                  
                 <div class="card-body">
                   <div class="text-xs mb-1"><a href="/Investor">Investor</a></div>    
                 </div>
                </button>
             </div>
             </div>
           </div>
    
    
   </section>
        <br></br> 
  <footer>
    <p id="footer">
    © Copyright 2021. All Rights Reserved. | Snapper Future Tech Pvt Ltd.
   <a href ="https://www.youtube.com/channel/UCPqAz8EgZQe6rlSGb9emfmw" style={{padding:"5px",float:"right"}}>
    <FontAwesomeIcon icon={faYoutube} />
    </a>
    <a href ="https://twitter.com/snapper_future" style={{padding:"5px",float:"right"}}>
    <FontAwesomeIcon icon={faTwitter} />
    </a>
    <a href ="https://www.facebook.com/SnapperFutureTech" style={{padding:"5px",float:"right"}}>
    <FontAwesomeIcon icon={faFacebook} />
    </a>
    <a href ="https://www.linkedin.com/company/snapper" style={{padding:"5px",float:"right"}}>
    <FontAwesomeIcon icon={faLinkedin} />
    </a>
    < a href="https://snapperfuturetech.com" style={{padding:"3px",float:"right", color:"white"}}>
      Snapperfuturetech</a>
      
   
   
		</p>

	</footer>  
	{this.state.showPopup ? 
    <Popup closePopup={this.togglePopup.bind(this)}/>
    : null
  }   





    </div>
    );
 }
}
export default Main;


class Popup extends React.Component {
	render() {
	  return (
		<div className='popup'>
		  <div className='popup_inner'>
		  <div class="h1 text-primary"> About Token</div>
      <div class="row">
      <div style={{width:"50%",borderRadius:"3px",boxShadow: "0 0 5px 0 rgb(0 0 0 / 10%)",float:"left"}}>
		  <div class="table-responsive">
            <table class="table caption-top">
                    <thead>
					<tr>
                        <th scope="row"><FontAwesomeIcon icon={faCalendarWeek} />  </th>
                        <th scope="row">Start : 27/04/2021 <br></br>End : 28/04/2021</th>
                        </tr>
					<tr>
                        <th scope="row"><FontAwesomeIcon icon={faEthereum} />  Token Name</th>
                        <th scope="row">Snapper Coin</th>
                    </tr>
					<tr>
                        <th scope="row"><FontAwesomeIcon icon={faEthereum} />  Token Symbol</th>
                        <th scope="row">SNC</th>
                    </tr>
					<tr>
                        <th scope="row"><FontAwesomeIcon icon={faRavelry} />  Rate</th>
                        <th scope="row">1 wei</th>
                    </tr>                    
					<tr>
                        <th scope="row"><FontAwesomeIcon icon={faCertificate} />  KYC</th>
                        <th scope="row">KYC Required</th>
                    </tr>
					<tr>
						<th scope="row"><FontAwesomeIcon icon={faReplyd} />  Refund Claim</th>
                        <th scope="row">Possible</th>
                    </tr>
                    <tr>
                        <th scope="row"><FontAwesomeIcon icon={faGlobe} />  Platform</th>
                        <th scope="row">ERC20</th>
                    </tr>
                    <tr>
                         <th scope="row"><FontAwesomeIcon icon={faMapMarkerAlt}/>  Country</th>
                         <th scope ="row">India</th>
                    </tr>
					<tr>
						<th scope="row"><FontAwesomeIcon icon={faPoll} />  Market Place</th>
                        <th scope="row">#22</th>
                    </tr>
                    <tr>
                         <th scope="row"><FontAwesomeIcon icon={faFunnelDollar}/>  Market Cap</th>
                         <th scope ="row">48234 Cr.</th>
                    </tr>
                    <tr>
                         <th scope="row"><FontAwesomeIcon icon={faCommentsDollar}/>  Circulating Supply</th>
                         <th scope ="row">12861 Cr.Token</th>
                    </tr>
                    <tr>
                        <th scope="row"><FontAwesomeIcon icon={faCommentDollar}/>  Trading Activity</th>
                        <th scope ="row">66%Buy 34%Sell</th>
                    </tr>
                    </thead>
            </table>
        </div>
        </div> 
        <div  style={{width :"50%",float:"left"}}>
         
        <Doughnut
          data={option}
          options={{
            title:{
              display:true,
              text:'Westing of Tokens',
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
            }
          }}
     
        />
    </div>
         </div> 
         
			<span className="close-icon" onClick={this.props.closePopup}>x</span>

      </div>
      </div>
		  
	  );
	}
  }

