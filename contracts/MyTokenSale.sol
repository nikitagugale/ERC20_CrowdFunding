// SPDX-License-Identifier: MIT

pragma solidity ^0.5.0;


import "@openzeppelin/contracts/crowdsale/Crowdsale.sol";
import "@openzeppelin/contracts/ownership/Ownable.sol";
//import "@openzeppelin/contracts/crowdsale/validation/TimedCrowdsale.sol";
import  "@openzeppelin/contracts/crowdsale/validation/CappedCrowdsale.sol";
import "@openzeppelin/contracts/lifecycle/Pausable.sol";

contract MyTokenSale is Crowdsale,Ownable,CappedCrowdsale
,Pausable
{ 
  uint256 minCap = 10;
  

    mapping(address => uint256) public contribution;
    mapping(address => bool) allowed;
    constructor(
        uint256 rate,             //how many wei we need to pay to buy tokens
        address payable wallet,   //this receives amount of wei which are sent to crowdsale
        IERC20 token ,            // transfer these tokens once you receive wei in your wallet
        uint256 cap
)public Crowdsale(rate, wallet, token)
    CappedCrowdsale(cap)
    
    Pausable ()

     { } 
   
    //overide prevalidate function()
    function _preValidatePurchase(address beneficiary, uint256 weiAmount)
       internal
        whenNotPaused
      view
     
    {
        super._preValidatePurchase(beneficiary,weiAmount);//calling parent contract
       require(KycCompleted(msg.sender),"KYC Is Not Completed");
    }
    
    function _preValidatePurchase1(address beneficiary1, uint256 weiAmount1)
        public
        payable
    
    {
        super._preValidatePurchase(beneficiary1, weiAmount1);
        uint256 existingPurchase = contribution[beneficiary1];
        uint256 newContribution = existingPurchase.add(weiAmount1);
        require(newContribution >= minCap);
        contribution[beneficiary1] = newContribution;
    }

    

//KYC Functionality
     function setKycCompleted(address _addr) public onlyOwner{
        allowed[_addr] = true;
    }
    //dont allow if KYC is pending => dsiable user
    function setKycRevoked(address _addr) public onlyOwner{
        allowed[_addr] = false;
    }
    //check if KYC is already done => allow user
    function KycCompleted(address _addr) public view returns(bool){
        return allowed[_addr];
    }
}

