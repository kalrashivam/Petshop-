const { expect } = require("chai");
// const { contract } = require('@openzeppelin/test-environment');
const IERC20 = require('@openzeppelin/contracts/build/contracts/IERC20.json');

describe('PetShop', function() {
    let petMarket;
    const accountAddress = '0x16463c0fdb6ba9618909f5b120ea1581618c1b9e';
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

        await expect(petMarket.connect(owner).addPet(20),
                     'does not emit event')
            .to.emit(petMarket, 'PetAdded').withArgs(owner.address, 20, 2)
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

        daiAccount = ethers.provider.getSigner(accountAddress);
        let dai = new ethers.Contract(daiAddress, IERC20.abi, daiAccount);
    });
})