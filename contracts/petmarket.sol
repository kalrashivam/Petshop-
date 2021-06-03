// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.3;
import "hardhat/console.sol";
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract PetShop {
    uint petId;
    address private daiAddress = 0x6B175474E89094C44Da98b954EedeAC495271d0F;
    IERC20 daiToken = IERC20(daiAddress);

    struct Pet {
        uint minAmount;
        address petOwner;
        bool exists;
    }

    mapping (uint => Pet) pets;
    event PetSold(address seller, address buyer, uint256 amount);
    event PetAdded(address owner, uint amount, uint petId);

    function buyPet(uint256 amount, uint256 _petId) payable public {
        require(pets[_petId].exists, "Pet does not exist");
        require(pets[_petId].minAmount <= amount, "buy amount cannot be less than min amount");
        console.log(msg.sender);
        console.log(pets[_petId].petOwner);
        console.log(amount);
        console.log(daiToken.allowance(msg.sender, pets[_petId].petOwner));
        daiToken.transferFrom(msg.sender, pets[_petId].petOwner, amount);

        emit PetSold(pets[_petId].petOwner, msg.sender, amount);
    }

    function addPet(uint256 amount) external {
        petId++;
        pets[petId] = Pet(amount, msg.sender, true);

        emit PetAdded(pets[petId].petOwner, pets[petId].minAmount, petId);
    }
}