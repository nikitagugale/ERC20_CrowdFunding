import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import MyToken from "./contracts/MyToken.json";
import MyTokenSale from "./contracts/MyTokenSale.json";

import Admin from "./Components/Admin";
import Investor from "./Components/Investor";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPoll,faFunnelDollar,faCommentsDollar,faCommentDollar,faCalendarWeek,faCertificate,faGlobe, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import {faEthereum,faRavelry,faReplyd,faLinkedin, faYoutube, faFacebook,faTwitter} from "@fortawesome/free-brands-svg-icons";
import { Doughnut} from 'react-chartjs-2';
import Web3 from 'web3';
import "./CSS/Main.css"
import "./App.css";



//popup graph data
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
class App extends Component {
 
     
    //to call below func. => react life-cycle method
    async componentWillMount() {
      await this.loadWeb3()
      await this.loadBlockchainData()
  }
    
    
    
    async loadWeb3(){
      //for ethereum browser
      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum)
        await window.ethereum.enable()
        //for legacy browsers 
    } else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider)
        //for invalid response
    } else {
        window.alert("Non-ethereum browser detected")
    }
    }
    async loadBlockchainData(){
      const web3 = window.web3
        const accounts = await web3.eth.getAccounts() //load accounts
        this.setState({ account: accounts[0] }) //setting account => store a/c in state obj. in react
        const networkId = await web3.eth.net.getId();
        // Get the contract instance.
        const tokenInstance = new web3.eth.Contract(
          MyToken.abi,
          MyToken.networks[networkId] && MyToken.networks[networkId].address)
          this.setState({tokenInstance})
      
      const tokensaleInstance = new web3.eth.Contract(
          MyTokenSale.abi, MyTokenSale.networks[networkId].address)
          this.setState({ tokensaleInstance })

      

      //to get balance from contract
      const balance = await tokenInstance.methods.balanceOf(this.state.account).call() //for checking balance
      console.log(balance);
      this.setState({ balance: web3.utils.fromWei(balance.toString(), 'Ether') })
     
      const cap = await this.state.tokensaleInstance.methods.cap().call()
      console.log(cap);
      this.setState({cap:web3.utils.fromWei(cap.toString(), 'Ether')})


      //to get transaction from contract
      const transactions = await tokenInstance.getPastEvents('Transfer', { fromBlock: 0, toBlock: 'latest' }, { from: this.state.account })
      this.setState({ transactions }) //this.setState({ contract}) //ES6



      this.setState({ loaded: true, tokenSaleAddress: MyTokenSale.networks[networkId].address}, 
        this.updateUserTokens); // app is fully loaded
    }


  
     
    
    constructor(props) {
      var today = new Date(),
     strm = (today.getMinutes()+0),
      edm = (today.getMinutes()+5),
      start = today.getDate() + '/' + (today.getMonth()+1) + '/' +today.getFullYear() + ',' +today.getHours() + ':' +today.getMinutes() + ':' + today.getSeconds(),
      end = (today.getDate()) + '/' + (today.getMonth()+1) + '/' +today.getFullYear() + ',' +today.getHours() + ':' + (today.getMinutes()+5) + ':' + today.getSeconds();
       
      super(props);
      this.state = {
       strm :strm,
        edm :edm,
        start: start,
        end: end,
        showPopup: false,
        account: '', //empty string in the beginning
        tokensaleInstance: null, //no deployed contract initially
        balance: 0, //initial supply to zero
        transactions: [], //empty color array
        pause : false,  //pausable checkbox
       // name: "React",
      showHideAdmin: false,
      showHideInvestor: false
      };
      this.transfer = this.transfer.bind(this);      
      this.hideComponent = this.hideComponent.bind(this);
      this.handleBuyTokens = this.handleBuyTokens.bind(this);
      this.handleKycWhitelisting = this.handleKycWhitelisting.bind(this);
      this.handlePausable = this.handlePausable.bind(this);
      this.handleInputChange = this.handleInputChange.bind(this);
      }
      hideComponent(name) {
        
        switch (name) {
          case "showHideAdmin":
            this.setState({ showHideAdmin: !this.state.showHideAdmin });
            break;
          case "showHideInvestor":
            this.setState({ showHideInvestor: !this.state.showHideInvestor });
            break;
            default:;
          }
        }
      
      togglePopup() {
        this.setState({showPopup: !this.state.showPopup}); 
      }
      transfer(recipient, amount) {
        this.state.tokensaleInstance.methods.transfer(recipient, amount).send({ from: this.state.account })
    }
    
     
      //handle user address for kyc whitelisting
    handleInputChange = (event)=>{
      const target = event.target;
      const value = target.type ==="checkbox" ? target.checked :target.value;
      const name = target.name;

      this.setState({
          [name]:value  //here [name] = kycAddress and value = user a/c address
      })
  }
  //handle kyc whitelisting functionality
  handleKycWhitelisting = async() =>{
   //                                     user a/c address            contract deployer/owner address
      await this.state.tokensaleInstance.methods.setKycCompleted(this.state.kycAddress).send({from: this.state.account})
      alert("Kyc for "+this.state.kycAddress+"Is Completed!!")
  
  }
    
    //update token here
    updateUserTokens = async() =>{
        let userTokens = await this.state.tokenInstance.methods.balanceOf(this.state.account).call()
        this.setState({userTokens : userTokens})
    }
    //listen to token transfer
    listenTokenTransfer = async() =>{
        this.tokenInstance.events.Trasfer({to: this.accounts[0]}).on("data",this.updateUserTokens)
    }
    handlePausable = async() =>{
      
      var checkBox = document.getElementById("paused");
      
        if (checkBox.checked === true)
        {
          var p1 = window.confirm("Are you sure you want to Pause ICO?");
                if (p1 === true) 
                {
                  this.setState({pause:true})
                } 
                else { checkBox.checked = false}
        }
         else {
          var p2 = window.confirm("Are you sure you want to Un Pause ICO?");
          if (p2 === true) 
          {
            this.setState({pause:false})
          } 
          else { checkBox.checked = true}
        }
      
   }
    //handle buyToken here
    handleBuyTokens = async() =>{
      var t = new Date();
     console.log(this.state.strm);
      console.log(this.state.edm);
       //  54                59
       console.log(t.getMinutes())
       
      if(t.getMinutes() >= this.state.strm && t.getMinutes() < this.state.edm)
      {
           if(this.state.pause===false)
          {
              await this.state.tokensaleInstance.methods.buyTokens(this.state.account).send({from: this.state.account, value: window.web3.utils.toWei("1","wei")})
          }
          else{
            alert("ICO PAUSED")
          }
      }
      else
        alert("Timed Out")
      
    
    
    }
     handleRefund= async()=> {
      var r = window.confirm("Are you sure you want to refund?");
      if (r === true) 
        {console.log("You Pressed Ok!")
      //  await this.tokenInstance.methods.refund(this.accounts[0]).send({from: this.accounts[0], value: this.web3.utils.toWei("1","wei")})
      } 

      else { console.log( "You pressed Cancel!")}
}
    
  render() {
    const { showHideAdmin, showHideInvestor } = this.state;
    
    return (
      <div className="App">
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
                <ul><center><a href="/" class="btn btn-outline-primary" style={{paddingLeft:"3px"}} onClick = {this.handleBuyTokens}>Buy now</a>
							  <button class="btn btn-outline-primary" style={{marginLeft:"5px"}} onClick={this.togglePopup.bind(this)}>About Token</button></center></ul>
    						<p class="card-text">Snapper Future Tech is a global services & technology products company, leading digital transformation for enterprises using blockchain. It offers services in Blockchain application development, training & consulting and an innovative suite of specialised products for e-Governance, Financial Services, Insurance, Sustainable Supply Chain & Healthcare. Established in 2017 in Pune, Snapper Future Tech has raised Pre-Seed and Seed rounds through Enemtech Capital and strategic investors globally. A Hyperledger Certified Service Provider (HCSP) & Training partner (HTP), the company participates in open-source initiatives across the globe & has robust technological alliances & partnerships with Hyperledger, Oracle, Amazon Web Services, IBM, Trust over IP & Sovrin.</p>
    					</div>
  						<div class="card-footer  border-0 mb-3">
							  <center><small>Start date :<b> {this.state.start}</b> </small></center>      <center><small> End date: <b>{this.state.end}</b></small></center>
  						</div>
					  </div>
    </div>
    
          <div class="row" style={{marginLeft:"50%",paddingTop:"50px"}}>
            <div class="card-deck">
             <div class="card shadow border-primary h-90 py-2 btn" style={{width:"300px"}}>
                <button class="border-0 bg-white"  onClick={() => this.hideComponent("showHideAdmin")}>
                  <div class="card-body">
                    <div class="text-xs  mb-1">Admin  </div>
                  </div>
                </button>
             </div>
          
              <div class="card shadow border-primary h-90 py-2">
               <button class="border-0 bg-white" onClick={() => this.hideComponent("showHideInvestor")}>
                 <div class="card-body">
                   <div class="text-xs mb-1">Investor </div>    
                 </div>
                </button>
             </div>
             </div>
           </div>
    
    
    {showHideAdmin && <Admin  balance={this.state.balance}
    
    handleInputChange={this.handleInputChange}
    handleKycWhitelisting={this.handleKycWhitelisting}
    handlePausable = {this.handlePausable}
   tokensaleInstance={this.state.tokensaleInstance}
   cap = {this.state.cap}/>}
    {showHideInvestor && <Investor tokenSaleAddress={this.state.tokenSaleAddress}
    userTokens={this.state.userTokens}
    handleBuyTokens={this.handleBuyTokens}
    transactions={this.state.transactions}/>}
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
  //  </Router>
    );
  }
}
//About Tokens
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



              
          



export default App;
//export {setState, componentDidMount};
