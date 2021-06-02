// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract PetShop {
    uint petId;
    address private daiAddress = 0x6B175474E89094C44Da98b954EedeAC495271d0F;
    IERC20 daiToken = IERC20(daiAddress);

    struct Pet {
        uint minAmount;
        address petOwner;
    }

    mapping (uint => Pet) pets;
    event PetSold(address seller, address buyer, uint256 amount);

    function buyPet(uint256 amount, uint256 _petId) payable public returns (uint256) {
        require(pets[_petId].minAmount <= amount, "buy amount cannot be less than min amount");
        emit PetSold(pets[_petId].petOwner, msg.sender, amount);
        daiToken.transferFrom(msg.sender, pets[_petId].petOwner, amount);

        return petId;
    }

    function addPet(uint256 amount) external returns (uint256) {
        petId++;
        pets[petId] = Pet(amount, msg.sender);

        return petId;
    }
}