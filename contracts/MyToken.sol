// SPDX-License-Identifier: MIT
pragma solidity ^0.5.0;


import "@openzeppelin/contracts/token/ERC20/ERC20Detailed.sol";
import  "@openzeppelin/contracts/token/ERC20/ERC20.sol";
contract MyToken is ERC20Detailed,ERC20{
    constructor ()public ERC20Detailed("Snapper Coins","SNC",0){
     //intial supply 
     _mint(msg.sender, 10000); //creating intial supply and allocates to the contract deployer 

    }

}