const { expect } = require("chai");
const IERC20 = require('@openzeppelin/contracts/build/contracts/IERC20.json');

describe('PetShop', function() {
    const accountAddress = '0x61a6b1eda7e514d4d6259aa11fd227118386ed84';
    const daiAddress = '0x6B175474E89094C44Da98b954EedeAC495271d0F';

    before(async () => {
        const petShop = await ethers.getContractFactory("PetShop");
        [owner, addr1, addr2] = await ethers.getSigners();
        petMarket = await petShop.deploy();
    });

    it("Add pet to the pet shop", async function() {
        expect((await
                (await petMarket.connect(owner).addPet(20))
                    .wait()).events[0].args['petId'].toNumber(), 'wrong PetId')
            .to.equal(1);

        await expect(petMarket.connect(addr1).addPet(20),
                     'does not emit event')
            .to.emit(petMarket, 'PetAdded').withArgs(addr1.address, 20, 2)
    });

    it("Can not be less than the min Amount", async function() {
        await expect(petMarket.connect(addr1).buyPet(1, 1)).to.be.reverted;
    });

    it("Pet does not exist", async function() {
        await expect(petMarket.connect(addr1).buyPet(4, 4)).to.be.reverted;
    });

    it("buy pet from the pet shop", async function() {
        await hre.network.provider.request({
            method: "hardhat_impersonateAccount",
            params: [accountAddress]
        })

        daiAccount = await ethers.getSigner(accountAddress);
        let dai = new ethers.Contract(daiAddress, IERC20.abi, daiAccount);
        await dai.connect(daiAccount).approve(owner.address, ethers.utils.parseEther("22"));
        m = await dai.balanceOf(daiAccount.address);
        // console.log(m.toNumber());
        // (await dai.allowance(daiAccount.address, owner.address)).toNumber();

        await expect(petMarket.connect(daiAccount).buyPet(21, 1)).to
            .emit(petMarket, 'PetSold').withArgs(owner.address, daiAccount.address, 22);
    });
})