/**
 * @type import('hardhat/config').HardhatUserConfig
 */

require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.3",
  networks: {
    hardhat: {
      forking: {
        url: "https://eth-mainnet.alchemyapi.io/v2/bTkMKOKwfEsEpU-frKzLzu5wXPT-1dS6",
        blockNumber: 12555195
      }
    }
  }
};
