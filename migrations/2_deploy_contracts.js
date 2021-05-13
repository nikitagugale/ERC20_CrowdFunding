let MyToken = artifacts.require("./MyToken.sol")
let MyTokenSale = artifacts.require("./MyTokenSale.sol")


require('dotenv').config({path:"../.env"})
const cap = web3.utils.toWei('10', 'wei');

  
  
module.exports = async function(deployer) {
    //rate wallet token
   
 


    let addr = await web3.eth.getAccounts() //wallet
   
    
  
    
    await deployer.deploy(MyToken)
    await deployer.deploy(MyTokenSale, 1, addr[0], MyToken.address,cap)


    let instance = await MyToken.deployed()
    await instance.transfer(MyTokenSale.address, process.env.INITIAL_TOKENS) // Transfer all tokens from mytoken to mytokensale contract

};