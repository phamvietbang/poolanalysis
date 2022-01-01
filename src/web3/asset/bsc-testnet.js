import AAVE from "../../assets/icons/tokens/aave.svg";
import ADA from "../../assets/icons/tokens/ADA.png";
import BCH from "../../assets/icons/tokens/BCH.png";
import BTCB from "../../assets/icons/tokens/BTCB.png";
import busd from "../../assets/icons/tokens/busd.png";
import dai from "../../assets/icons/tokens/dai.svg";
import DOT from "../../assets/icons/tokens/DOT.png";
import LINK from "../../assets/icons/tokens/LINK.png";
import LTC from "../../assets/icons/tokens/LTC.png";
import SXP from "../../assets/icons/tokens/SXP.svg";
import usdc from "../../assets/icons/tokens/usdc.svg";
import usdt from "../../assets/icons/tokens/usdt.svg";
import BNB from "../../assets/icons/tokens/BNB.png";
import XVS from "../../assets/icons/tokens/XVS.png";
import ETH from "../../assets/icons/tokens/ETH.png";
import XRP from "../../assets/icons/tokens/xrp-logo.png";
import CAKE from "../../assets/icons/tokens/cake.svg";
import DOGE from "../../assets/icons/tokens/DOGE.png";
import TRAVA from "../../assets/icons/tokens/Trava.png";
import { BASE18, BASE8 } from "../../constance";

export const bscTestnetAssets = [
  {
    name: "DAI",
    code: "DAI",
    reserveDecimals: BASE18.toFixed(),
    imgSrc: dai,
    underlyingAddress: "0xCEdc3B4d3c4359a1F842cf94D3418feDB105669f",
    interestRateParams: { uOptimal: 0.8, base: 0, slope1: 0.04, slope2: 0.75 },
    riskParams: { collateral: true, ltv: 0.75, threshold: 0.8, penalty: 0.05, reserveFactor: 0.1 },
    ltv: {
      base: 75,
      multiplier: [1, 1.03, 1.05, 1.07],
    },
    lt: {
      base: 80,
      multiplier: [1, 1.03, 1.05, 1.07],
    },
  },
  {
    name: "USD Coin",
    code: "USDC",
    reserveDecimals: BASE18.toFixed(),
    imgSrc: usdc,
    underlyingAddress: "0xFc3fB4aA34c1720d5a50EB70b60d3118CC47636C",
    interestRateParams: { uOptimal: 0.9, base: 0, slope1: 0.04, slope2: 0.6 },
    riskParams: {
      collateral: false,
      ltv: 0.8,
      threshold: 0.85,
      penalty: 0.05,
      reserveFactor: 0.1,
    },
    ltv: {
      base: 80,
      multiplier: [1, 1.03, 1.05, 1.07],
    },
    lt: {
      base: 85,
      multiplier: [1, 1.03, 1.05, 1.07],
    },
  },
  {
    name: "Tether",
    code: "USDT",
    reserveDecimals: BASE18.toFixed(),
    imgSrc: usdt,
    underlyingAddress: "0x059BA0204dE65BDDB172D55d6A53074ea98d7917",
    interestRateParams: { uOptimal: 0.8, base: 0, slope1: 0.04, slope2: 0.75 },
    riskParams: { collateral: false, ltv: 0.75, threshold: 0.8, penalty: 0.05, reserveFactor: 0.1 },
    ltv: {
      base: 75,
      multiplier: [1, 1.03, 1.05, 1.07],
    },
    lt: {
      base: 80,
      multiplier: [1, 1.03, 1.05, 1.07],
    },
  },
  {
    name: "ETH",
    code: "ETH",
    reserveDecimals: BASE18.toFixed(),
    imgSrc: ETH,
    underlyingAddress: "0x1bAdc96d03D7be5c4432284fBDfc7CCEdC9ef41C",
    interestRateParams: { uOptimal: 0.65, base: 0, slope1: 0.08, slope2: 1 },
    riskParams: { collateral: true, ltv: 0.8, threshold: 0.825, penalty: 0.1, reserveFactor: 0.2 },
    ltv: {
      base: 80,
      multiplier: [1, 1.01, 1.02, 1.03],
    },
    lt: {
      base: 82,
      multiplier: [1, 1.01, 1.02, 1.03],
    },
  },
  {
    name: "Binance Coin",
    code: "BNB",
    reserveDecimals: BASE18.toFixed(),
    imgSrc: BNB,
    underlyingAddress: "0x910CB19698Eac48a6AB7Ccc9542B756f2Bdd67C6",
    interestRateParams: { uOptimal: 1, base: 0.02, slope1: 0.1, slope2: 0.0 },
    riskParams: {
      collateral: false,
      ltv: 0.75,
      threshold: 0.8,
      penalty: 0.08,
      reserveFactor: 0.2,
    },
    ltv: {
      base: 75,
      multiplier: [1, 1.03, 1.05, 1.07],
    },
    lt: {
      base: 80,
      multiplier: [1, 1.03, 1.05, 1.07],
    },
  },
  {
    name: "Bitcoin",
    code: "BTCB",
    reserveDecimals: BASE18.toFixed(),
    imgSrc: BTCB,
    underlyingAddress: "0xd69a84b23c4D5D29755A933b981FAAAC84968644",
    interestRateParams: { uOptimal: 1, base: 0.02, slope1: 0.1, slope2: 0 },
    riskParams: { collateral: false, ltv: 0.75, threshold: 0.8, penalty: 0.08, reserveFactor: 0.2 },
    ltv: {
      base: 70,
      multiplier: [1, 1.03, 1.05, 1.08],
    },
    lt: {
      base: 75,
      multiplier: [1, 1.03, 1.05, 1.08],
    },
  },
  {
    name: "Binance USD",
    code: "BUSD",
    reserveDecimals: BASE18.toFixed(),
    imgSrc: busd,
    underlyingAddress: "0x522d378d2e1EeCeEB332b3C18D473cf00526C888",
    interestRateParams: { uOptimal: 0.8, base: 0, slope1: 0.04, slope2: 0.218 },
    riskParams: { collateral: true, ltv: 0.75, threshold: 0.8, penalty: 0.08, reserveFactor: 0.1 },
    ltv: {
      base: 75,
      multiplier: [1, 1.03, 1.05, 1.07],
    },
    lt: {
      base: 80,
      multiplier: [1, 1.03, 1.05, 1.07],
    },
  },
  {
    name: "Swipe",
    code: "SXP",
    reserveDecimals: BASE18.toFixed(),
    imgSrc: SXP,
    underlyingAddress: "0x522005cdB7359960d540E1a2ade3a31871c1E90C",
    interestRateParams: { uOptimal: 1, base: 0.02, slope1: 0.1, slope2: 0 },
    riskParams: {
      collateral: false,
      ltv: 0.65,
      threshold: 0.7,
      penalty: 0.08,
      reserveFactor: 0.2,
    },
  },
  {
    name: "Venus",
    code: "XVS",
    reserveDecimals: BASE18.toFixed(),
    imgSrc: XVS,
    underlyingAddress: "0x1416052043e789ed41FCb2f022f800226c88307D",
    interestRateParams: { uOptimal: 1, base: 0.02, slope1: 0.1, slope2: 0 },
    riskParams: {
      collateral: false,
      ltv: 0.65,
      threshold: 0.7,
      penalty: 0.08,
      reserveFactor: 0.2,
    },
  },

  {
    name: "Litecoin",
    code: "LTC",
    reserveDecimals: BASE18.toFixed(),
    imgSrc: LTC,
    underlyingAddress: "0x7Da603bBE0d5227fC6f17018f3B10810963DAFd9",
    interestRateParams: { uOptimal: 1, base: 0.02, slope1: 0.1, slope2: 0 },
    riskParams: {
      collateral: false,
      ltv: 0.55,
      threshold: 0.6,
      penalty: 0.08,
      reserveFactor: 0.2,
    },
  },
  {
    name: "Chainlink",
    code: "LINK",
    reserveDecimals: BASE18.toFixed(),
    imgSrc: LINK,
    underlyingAddress: "0x858a247eB9cF89C153571d6B819ca7e68979C9d4",
    interestRateParams: { uOptimal: 1, base: 0.02, slope1: 0.1, slope2: 0 },
    riskParams: {
      collateral: false,
      ltv: 0.55,
      threshold: 0.6,
      penalty: 0.08,
      reserveFactor: 0.2,
    },
  },
  {
    name: "Polkadot",
    code: "DOT",
    reserveDecimals: BASE18.toFixed(),
    imgSrc: DOT,
    underlyingAddress: "0x7a6cE056D2FDd1142b80Bb2Dda941A0bDa03BF5d",
    interestRateParams: { uOptimal: 1, base: 0.02, slope1: 0.1, slope2: 0 },
    riskParams: {
      collateral: false,
      ltv: 0.55,
      threshold: 0.6,
      penalty: 0.08,
      reserveFactor: 0.2,
    },
  },
  {
    name: "Bitcoin Cash",
    code: "BCH",
    reserveDecimals: BASE18.toFixed(),
    imgSrc: BCH,
    underlyingAddress: "0x1B4c068a6c1Bf425d9e8d912c928F80EfCA012CC",
    interestRateParams: { uOptimal: 1, base: 0.02, slope1: 0.1, slope2: 0 },
    riskParams: {
      collateral: false,
      ltv: 0.55,
      threshold: 0.6,
      penalty: 0.08,
      reserveFactor: 0.2,
    },
  },
  {
    name: "Aave",
    code: "AAVE",
    reserveDecimals: BASE18.toFixed(),
    imgSrc: AAVE,
    underlyingAddress: "0xB87229778430E4b19351d5ec2c26A62979B9122a",
    interestRateParams: { uOptimal: 0.65, base: 0, slope1: 0.07, slope2: 1 },
    riskParams: {
      collateral: false,
      ltv: 0.7,
      threshold: 0.75,
      penalty: 0.05,
      reserveFactor: 0.1,
    },
  },
  {
    name: "Cardano",
    code: "ADA",
    reserveDecimals: BASE18.toFixed(),
    imgSrc: ADA,
    underlyingAddress: "0x7cF2990b00a40d22B1643E42f0Bb6Cc6F66eA54d",
    interestRateParams: { uOptimal: 1, base: 0.02, slope1: 0.1, slope2: 0 },
    riskParams: {
      collateral: false,
      ltv: 0.55,
      threshold: 0.6,
      penalty: 0.08,
      reserveFactor: 0.2,
    },
  },
  {
    name: "CAKE",
    code: "CAKE",
    reserveDecimals: BASE18.toFixed(),
    imgSrc: CAKE,
    underlyingAddress: "0x819c7ccd112a5aa47da93bc9e4835ea418CBD0C1",
    interestRateParams: { uOptimal: 0.65, base: 0, slope1: 0.08, slope2: 1 },
    riskParams: {
      collateral: false,
      ltv: 0.7,
      threshold: 0.75,
      penalty: 0.05,
      reserveFactor: 0.1,
    },
  },
  {
    name: "XRP",
    code: "XRP",
    reserveDecimals: BASE18.toFixed(),
    imgSrc: XRP,
    underlyingAddress: "0x7Daa5e04Ee267B48cD4CD8fd7B8a1c7bF9944058",
    interestRateParams: { uOptimal: 0.65, base: 0, slope1: 0.08, slope2: 1 },
    riskParams: {
      collateral: false,
      ltv: 0.7,
      threshold: 0.75,
      penalty: 0.05,
      reserveFactor: 0.1,
    },
  },
  {
    name: "Dogecoin",
    code: "DOGE",
    reserveDecimals: BASE8.toFixed(),
    imgSrc: DOGE,
    underlyingAddress: "0x3948256E4f4B6aAE6f209F370fd5b1Fa6eAd2c6C",
    interestRateParams: { uOptimal: 0.65, base: 0, slope1: 0.08, slope2: 1 },
    riskParams: {
      collateral: false,
      ltv: 0.7,
      threshold: 0.75,
      penalty: 0.05,
      reserveFactor: 0.1,
    },
  },
  {
    name: "Trava",
    code: "TRAVA",
    imgSrc: TRAVA,
    reserveDecimals: BASE18.toFixed(),
    underlyingAddress: "0x4ABEf176F22B9a71B45ddc6c4A115095d8761b37",
  },
];
