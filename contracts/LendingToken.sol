

   
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


import '@openzeppelin/contracts/token/ERC20/ERC20.sol';


contract LendingToken is ERC20 {

    address public admin;
    constructor() ERC20("MUKOLOS","MTK"){
        _mint(msg.sender, 1000000);
    }

        modifier onlyAdmin(){
            require(msg.sender==admin," you are not authorizeed");
            _;
        }
    function mint(uint256 _amount,address _recipient) external  onlyAdmin{
        
        _mint(_recipient, _amount );
    }
   function burn(address _address,uint256 _amount) external onlyAdmin{
       _burn(_address, _amount);
   }


}