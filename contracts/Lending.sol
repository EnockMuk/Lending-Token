
   
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


import '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import '@openzeppelin/contracts/security/ReentrancyGuard.sol';
contract Lending is ReentrancyGuard{


       event Deposit (address indexed account,address indexed user,uint256 amount);
       error Balance(string message);
       address public admin;

       mapping(address=>mapping(address=>uint256)) public addressAmountDeposit;

       constructor(){
           admin=msg.sender;
       }

       modifier balance(uint256 amount){
            if(amount<=0){

                revert Balance (" your amount is not enough, don't use zero");
            }

           _;
       }



       function deposit(address _token,uint256 _amount) external  nonReentrant balance(_amount){

         IERC20(_token).transferFrom(msg.sender, address(this),_amount);
         addressAmountDeposit[msg.sender][_token]+=_amount;
         emit Deposit(_token,msg.sender,_amount);
       }
    
}