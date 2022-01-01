import BTCB from "../../assets/icons/tokens/BTCB.png";
import dai from "../../assets/icons/tokens/dai.svg";
import usdc from "../../assets/icons/tokens/usdc.svg";
import usdt from "../../assets/icons/tokens/usdt.svg";
import ETH from "../../assets/icons/tokens/ETH.png";
import FTM from "../../assets/icons/tokens/FTM.png";
import TRAVA from "../../assets/icons/tokens/Trava.png";
import { BASE18, BASE8 } from "../../constance";
import BigNumber from "bignumber.js";

export const ftmMainnetAssets = [
  {
    name: "DAI",
    code: "DAI",
    reserveDecimals: BASE18.toFixed(),
    imgSrc: dai,
    underlyingAddress: "0x8D11eC38a3EB5E956B052f67Da8Bdc9bef8Abf3E",
    interestRateParams: { uOptimal: 0.8, base: 0, slope1: 0.04, slope2: 0.75 },
    riskParams: { collateral: true, ltv: 0.75, threshold: 0.8, penalty: 0.05, reserveFactor: 0.1 },
  },
  {
    name: "USD Coin",
    code: "USDC",
    reserveDecimals: BigNumber("1000000").toFixed(),
    imgSrc: usdc,
    underlyingAddress: "0x04068DA6C83AFCFA0e13ba15A6696662335D5B75",
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
    name: "ETH",
    code: "ETH",
    reserveDecimals: BASE18.toFixed(),
    imgSrc: ETH,
    underlyingAddress: "0x74b23882a30290451A17c44f4F05243b6b58C76d",
    interestRateParams: { uOptimal: 0.65, base: 0, slope1: 0.08, slope2: 1 },
    riskParams: { collateral: true, ltv: 0.8, threshold: 0.825, penalty: 0.1, reserveFactor: 0.2 },
  },

  {
    name: "Bitcoin",
    code: "BTCB",
    reserveDecimals: BASE8.toFixed(),
    imgSrc: BTCB,
    underlyingAddress: "0x321162Cd933E2Be498Cd2267a90534A804051b11",
    interestRateParams: { uOptimal: 1, base: 0.02, slope1: 0.1, slope2: 0 },
    riskParams: { collateral: false, ltv: 0.75, threshold: 0.8, penalty: 0.08, reserveFactor: 0.2 },
  },

  {
    name: "FTM",
    code: "FTM",
    reserveDecimals: BASE18.toFixed(),
    imgSrc: FTM,
    underlyingAddress: "0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83",
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
    name: "FUSDT",
    code: "USDT",
    reserveDecimals: BigNumber("1000000").toFixed(),
    imgSrc: usdt,
    underlyingAddress: "0x049d68029688eAbF473097a2fC38ef61633A3C7A",
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
    underlyingAddress: "0x477a9D5dF9bedA06F6b021136a2efe7BE242fCC9",
  },
];
