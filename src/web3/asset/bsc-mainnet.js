import AAVE from "../../assets/icons/tokens/aave.svg";
import ADA from "../../assets/icons/tokens/ADA.png";
import BTCB from "../../assets/icons/tokens/BTCB.png";
import busd from "../../assets/icons/tokens/busd.png";
import dai from "../../assets/icons/tokens/dai.svg";
import DOT from "../../assets/icons/tokens/DOT.png";
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

export const bscMainnetAssets = [
  {
    name: "Binance-Peg Dai Token",
    code: "DAI",
    reserveDecimals: BASE18.toFixed(),
    imgSrc: dai,
    underlyingAddress: "0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3",
    interestRateParams: { uOptimal: 0.8, base: 0, slope1: 0.04, slope2: 0.75 },
    riskParams: { collateral: true, ltv: 0.75, threshold: 0.8, penalty: 0.05, reserveFactor: 0.1 },
  },

  {
    name: "Binance-Peg USD Coin",
    code: "USDC",
    reserveDecimals: BASE18.toFixed(),
    imgSrc: usdc,
    underlyingAddress: "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d",
    interestRateParams: { uOptimal: 0.9, base: 0, slope1: 0.04, slope2: 0.6 },
    riskParams: {
      collateral: false,
      ltv: 0.8,
      threshold: 0.85,
      penalty: 0.05,
      reserveFactor: 0.1,
    },
  },
  {
    name: "Binance-Peg BSC-USD",
    code: "USDT",
    reserveDecimals: BASE18.toFixed(),
    imgSrc: usdt,
    underlyingAddress: "0x55d398326f99059fF775485246999027B3197955",
    interestRateParams: { uOptimal: 0.8, base: 0, slope1: 0.04, slope2: 0.75 },
    riskParams: { collateral: false, ltv: 0.75, threshold: 0.8, penalty: 0.05, reserveFactor: 0.1 },
  },
  {
    name: "Binance-Peg Ethereum Token",
    code: "ETH",
    reserveDecimals: BASE18.toFixed(),
    imgSrc: ETH,
    underlyingAddress: "0x2170Ed0880ac9A755fd29B2688956BD959F933F8",
    interestRateParams: { uOptimal: 0.65, base: 0, slope1: 0.08, slope2: 1 },
    riskParams: { collateral: true, ltv: 0.8, threshold: 0.825, penalty: 0.1, reserveFactor: 0.2 },
  },
  {
    name: "Wrapped BNB",
    code: "BNB",
    reserveDecimals: BASE18.toFixed(),
    imgSrc: BNB,
    underlyingAddress: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
    interestRateParams: { uOptimal: 1, base: 0.02, slope1: 0.1, slope2: 0.0 },
    riskParams: {
      collateral: false,
      ltv: 0.75,
      threshold: 0.8,
      penalty: 0.08,
      reserveFactor: 0.2,
    },
  },
  {
    name: "Binance-Peg BTCB Token",
    code: "BTCB",
    reserveDecimals: BASE18.toFixed(),
    imgSrc: BTCB,
    underlyingAddress: "0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c",
    interestRateParams: { uOptimal: 1, base: 0.02, slope1: 0.1, slope2: 0 },
    riskParams: { collateral: false, ltv: 0.75, threshold: 0.8, penalty: 0.08, reserveFactor: 0.2 },
  },
  {
    name: "Binance-Peg BUSD Token",
    code: "BUSD",
    reserveDecimals: BASE18.toFixed(),
    imgSrc: busd,
    underlyingAddress: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
    interestRateParams: { uOptimal: 0.8, base: 0, slope1: 0.04, slope2: 1 },
    riskParams: { collateral: true, ltv: 0.75, threshold: 0.8, penalty: 0.08, reserveFactor: 0.1 },
  },
  {
    name: "Aave",
    code: "AAVE",
    reserveDecimals: BASE18.toFixed(),
    imgSrc: AAVE,
    underlyingAddress: "0xfb6115445Bff7b52FeB98650C87f44907E58f802",
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
    underlyingAddress: "0x3EE2200Efb3400fAbB9AacF31297cBdD1d435D47",
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
    name: "CAKE",
    code: "CAKE",
    reserveDecimals: BASE18.toFixed(),
    imgSrc: CAKE,
    underlyingAddress: "0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82",
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
    underlyingAddress: "0x1D2F0da169ceB9fC7B3144628dB156f3F6c60dBE",
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
    underlyingAddress: "0xbA2aE424d960c26247Dd6c32edC70B295c744C43",
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
    underlyingAddress: "0x0391bE54E72F7e001f6BBc331777710b4f2999Ef",
  },
  {
    name: "DOT",
    code: "DOT",
    imgSrc: DOT,
    reserveDecimals: BASE18.toFixed(),
    underlyingAddress: "0x7083609fCE4d1d8Dc0C979AAb8c869Ea2C873402",
  },
  {
    name: "XVS",
    code: "XVS",
    imgSrc: XVS,
    reserveDecimals: BASE18.toFixed(),
    underlyingAddress: "0xcF6BB5389c92Bdda8a3747Ddb454cB7a64626C63",
  },
];
