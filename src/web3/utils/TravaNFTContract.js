import { getCurrentContractAddresses } from "../address";
import TravaNFTABI from "../artifacts/contracts/TravaNFT.json";
import { getWeb3Sender, web3Reader } from "../wallet";

var contractReader = null;
var contractSender = null;

function getContractReader() {
  const { TRAVA_MARKET_ADDRESS, TRAVA_NFT_ADDRESS } = getCurrentContractAddresses();
  if (!contractReader) {
    contractReader = new web3Reader.eth.Contract(TravaNFTABI, TRAVA_NFT_ADDRESS);
  }
  return contractReader;
}

function getContractSender() {
  const { TRAVA_MARKET_ADDRESS, TRAVA_NFT_ADDRESS } = getCurrentContractAddresses();
  const web3Sender = getWeb3Sender();
  if (!contractSender) {
    contractSender = new web3Sender.eth.Contract(TravaNFTABI, TRAVA_NFT_ADDRESS);
  }
  return contractSender;
}

async function mint(to, ipfsURI, accountAddress) {
  const res = await getContractSender().methods.mint(to, ipfsURI).send({ from: accountAddress });
  return res;
}

async function burn(tokenId, accountAddress) {
  const res = await getContractSender().methods.burn(tokenId).send({ from: accountAddress });
  return res;
}

async function getTokenByID(tokenId) {
  const res = await getContractReader().methods.getTokenMetadata(tokenId).call();
  return res;
}

async function getCounter() {
  const res = await getContractReader().methods.getCounter().call();
  return parseInt(res.toString());
}

async function approve(nftContract, tokenId, accountAddress) {
  const result = await getContractSender().methods.approve(nftContract, tokenId).send({ from: accountAddress });
  return result;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  mint,
  burn,
  getTokenByID,
  getCounter,
  approve,
};
