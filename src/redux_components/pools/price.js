import BEP20 from "../../web3/artifacts/contracts/BEP20.json";
import WBNB from "../../web3/artifacts/contracts/WBNB.json";
import Web3 from "web3";
import { getCurrentNetwork, NETWORKS } from "../../web3/network";

const LP_ABI = [
  { inputs: [], payable: false, stateMutability: "nonpayable", type: "constructor" },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "owner", type: "address" },
      { indexed: true, internalType: "address", name: "spender", type: "address" },
      { indexed: false, internalType: "uint256", name: "value", type: "uint256" },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "sender", type: "address" },
      { indexed: false, internalType: "uint256", name: "amount0", type: "uint256" },
      { indexed: false, internalType: "uint256", name: "amount1", type: "uint256" },
      { indexed: true, internalType: "address", name: "to", type: "address" },
    ],
    name: "Burn",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "sender", type: "address" },
      { indexed: false, internalType: "uint256", name: "amount0", type: "uint256" },
      { indexed: false, internalType: "uint256", name: "amount1", type: "uint256" },
    ],
    name: "Mint",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "sender", type: "address" },
      { indexed: false, internalType: "uint256", name: "amount0In", type: "uint256" },
      { indexed: false, internalType: "uint256", name: "amount1In", type: "uint256" },
      { indexed: false, internalType: "uint256", name: "amount0Out", type: "uint256" },
      { indexed: false, internalType: "uint256", name: "amount1Out", type: "uint256" },
      { indexed: true, internalType: "address", name: "to", type: "address" },
    ],
    name: "Swap",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: "uint112", name: "reserve0", type: "uint112" },
      { indexed: false, internalType: "uint112", name: "reserve1", type: "uint112" },
    ],
    name: "Sync",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "from", type: "address" },
      { indexed: true, internalType: "address", name: "to", type: "address" },
      { indexed: false, internalType: "uint256", name: "value", type: "uint256" },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    constant: true,
    inputs: [],
    name: "DOMAIN_SEPARATOR",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "MINIMUM_LIQUIDITY",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "PERMIT_TYPEHASH",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      { internalType: "address", name: "", type: "address" },
      { internalType: "address", name: "", type: "address" },
    ],
    name: "allowance",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "value", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [{ internalType: "address", name: "to", type: "address" }],
    name: "burn",
    outputs: [
      { internalType: "uint256", name: "amount0", type: "uint256" },
      { internalType: "uint256", name: "amount1", type: "uint256" },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "decimals",
    outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "factory",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "getReserves",
    outputs: [
      { internalType: "uint112", name: "_reserve0", type: "uint112" },
      { internalType: "uint112", name: "_reserve1", type: "uint112" },
      { internalType: "uint32", name: "_blockTimestampLast", type: "uint32" },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { internalType: "address", name: "_token0", type: "address" },
      { internalType: "address", name: "_token1", type: "address" },
    ],
    name: "initialize",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "kLast",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [{ internalType: "address", name: "to", type: "address" }],
    name: "mint",
    outputs: [{ internalType: "uint256", name: "liquidity", type: "uint256" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "name",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "nonces",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "value", type: "uint256" },
      { internalType: "uint256", name: "deadline", type: "uint256" },
      { internalType: "uint8", name: "v", type: "uint8" },
      { internalType: "bytes32", name: "r", type: "bytes32" },
      { internalType: "bytes32", name: "s", type: "bytes32" },
    ],
    name: "permit",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "price0CumulativeLast",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "price1CumulativeLast",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [{ internalType: "address", name: "to", type: "address" }],
    name: "skim",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { internalType: "uint256", name: "amount0Out", type: "uint256" },
      { internalType: "uint256", name: "amount1Out", type: "uint256" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "bytes", name: "data", type: "bytes" },
    ],
    name: "swap",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "symbol",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [],
    name: "sync",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "token0",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "token1",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "totalSupply",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "value", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "value", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
];

export async function fetchTokensPrice() {
  const busd = { id: "busd", underlyingAddress: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56" };
  // const bnb = { id: "bnb", underlyingAddress: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c" };
  // const orai = { id: "orai", underlyingAddress: "0xA325Ad6D9c92B55A3Fc5aD7e412B1518F96441C0" };
  const trava = { id: "trava", underlyingAddress: "0x0391bE54E72F7e001f6BBc331777710b4f2999Ef" };

  const mainnetWeb3Reader = new Web3("https://bsc-dataseed1.defibit.io/");

  const busdContract = new mainnetWeb3Reader.eth.Contract(BEP20.abi, busd.underlyingAddress);
  // const oraiContract = new mainnetWeb3Reader.eth.Contract(BEP20.abi, orai.underlyingAddress);
  const travaContract = new mainnetWeb3Reader.eth.Contract(BEP20.abi, trava.underlyingAddress);

  const WBNB_ADDRESS = "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c";
  const wbnbContract = new mainnetWeb3Reader.eth.Contract(WBNB.abi, WBNB_ADDRESS);

  const wbnbBusdLpAddress = "0x1B96B92314C44b159149f7E0303511fB2Fc4774f";
  const wbnbBalanceBusdlp = await wbnbContract.methods.balanceOf(wbnbBusdLpAddress).call();
  const busdBalanceBusdlp = await busdContract.methods.balanceOf(wbnbBusdLpAddress).call();
  const bnbPrice = busdBalanceBusdlp / wbnbBalanceBusdlp;

  // const wbnbOraiLpAddress = "0x756E415E458ac05c1a69e834092034017f74Da93";
  // const wbnbBalanceOrailp = await wbnbContract.methods.balanceOf(wbnbOraiLpAddress).call();
  // const oraiBalanceOrailp = await oraiContract.methods.balanceOf(wbnbOraiLpAddress).call();
  // const oraiPrice = (wbnbBalanceOrailp / oraiBalanceOrailp) * bnbPrice;

  const wbnbTravaLpAddress = "0x865c77d4ff6383e06c58350a2cfb95cca2c0f056";
  const wbnbBalanceTravalp = await wbnbContract.methods.balanceOf(wbnbTravaLpAddress).call();
  const travaBalanceTravalp = await travaContract.methods.balanceOf(wbnbTravaLpAddress).call();
  const travaPriceOnBSC = (wbnbBalanceTravalp / travaBalanceTravalp) * bnbPrice;
  // console.log("🚧 --> fetchTokensPrice --> travaPriceOnBSC", travaPriceOnBSC);

  // const contract = new mainnetWeb3Reader.eth.Contract(LP_ABI, "0x865c77d4ff6383e06c58350a2cfb95cca2c0f056");
  // const totalSupplyRaw = await contract.methods.totalSupply().call();
  // const totalSupply = BigNumber(totalSupplyRaw);

  // const travabnbPrice = BigNumber(wbnbBalanceTravalp * bnbPrice * 2)
  //   .div(totalSupply)
  //   .toNumber();

  // ftm
  const travaOnFTM = { id: "travaOnFTM", underlyingAddress: "0x477a9D5dF9bedA06F6b021136a2efe7BE242fCC9" };
  const WFTM_ADDRESS = "0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83";
  const FTMnUSDC_ADDRESS = "0x2b4c76d0dc16be1c31d4c1dc53bf9b45987fc75c";
  const TRAVAnFTM_ADDRESS = "0x7af19103e0ecf20acd414d365b1d966c58fe3799";

  const ftmMainnetWeb3Reader = new Web3(NETWORKS.FTM_MAINNET.rpcUrls[0]);
  const wftmCR = new ftmMainnetWeb3Reader.eth.Contract(WBNB.abi, WFTM_ADDRESS);
  const travaOnFTMCR = new ftmMainnetWeb3Reader.eth.Contract(BEP20.abi, travaOnFTM.underlyingAddress);
  const usdcCR = new ftmMainnetWeb3Reader.eth.Contract(BEP20.abi, "0x04068da6c83afcfa0e13ba15a6696662335d5b75");

  const ftmBalance = (await wftmCR.methods.balanceOf(FTMnUSDC_ADDRESS).call()) / 1e18;
  const usdcBalance = (await usdcCR.methods.balanceOf(FTMnUSDC_ADDRESS).call()) / 1e6;
  const ftmPrice = usdcBalance / ftmBalance;

  const travaBalance = await travaOnFTMCR.methods.balanceOf(TRAVAnFTM_ADDRESS).call();
  // console.log("🚧 --> fetchOraclePrices --> travaBalance", travaBalance);
  const ftmBalance2 = await wftmCR.methods.balanceOf(TRAVAnFTM_ADDRESS).call();
  // console.log("🚧 --> fetchOraclePrices --> ftmBalance2", ftmBalance2);
  const travaPriceOnFTM = (ftmBalance2 / travaBalance) * ftmPrice;
  console.log("🚧 --> fetchTokensPrice --> travaPriceOnFTM", travaPriceOnFTM);
  // console.log("🚧 --> fetchOraclePrices --> travaPriceOnFTM", travaPriceOnFTM);

  // const contract2 = new ftmMainnetWeb3Reader.eth.Contract(LP_ABI, TRAVAnFTM_ADDRESS);
  // const totalSupply2 = await contract2.methods.totalSupply().call();
  // console.log("🚧 --> fetchOraclePrices --> totalSupply2", totalSupply2);
  // const ftmLpTravaPrice = BigNumber(ftmBalance2).times(ftmPrice).times(2).div(totalSupply2).toNumber();
  // console.log("🚧 --> fetchOraclePrices --> ftmLpTravaPrice", ftmLpTravaPrice);

  const travaPrice = getCurrentNetwork().chainId === NETWORKS.BSC_MAINNET.chainId ? travaPriceOnBSC : travaPriceOnFTM;

  return {
    // busd: 1,
    // bnb: bnbPrice,
    // orai: oraiPrice,
    trava: travaPrice,
    // travabnb: travabnbPrice,
    // bnbtrava2: travabnbPrice,
    // bnbtrava3: travabnbPrice,
    // trava4months: travaPrice,
    // trava8months: travaPrice,
  };
}
