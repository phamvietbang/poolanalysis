import { getCurrentContractAddresses } from "../address";
import ABI from "../artifacts/contracts/TravaNFTSell.json";
import { getWeb3Sender } from "../wallet";

var contractSender = null;

function getContractSender() {
  const { TRAVA_MARKET_ADDRESS } = getCurrentContractAddresses();
  const web3Sender = getWeb3Sender();
  if (!contractSender) {
    contractSender = new web3Sender.eth.Contract(ABI, TRAVA_MARKET_ADDRESS);
  }
  return contractSender;
}

async function createSale(nftAddress, tokenId, erc20Token, price, feeRecipients, feePercentage, accountAddress) {
  const res = await getContractSender()
    .methods.createNewNftSale(nftAddress, tokenId, erc20Token, price, feeRecipients, feePercentage)
    .send({ from: accountAddress });
  return res;
}

async function makeOrder(nftAddress, tokenId, erc20Token, accountAddress) {
  const res = await getContractSender()
    .methods.makeOrder(nftAddress, tokenId, erc20Token)
    .send({ from: accountAddress });
  return res;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  createSale,
  makeOrder,
};
