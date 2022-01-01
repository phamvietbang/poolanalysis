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
import WETH from "../../assets/icons/tokens/weth.svg";
import XVS from "../../assets/icons/tokens/XVS.png";
import ETH from "../../assets/icons/tokens/ETH.png";
import XRP from "../../assets/icons/tokens/xrp-logo.png";
import CAKE from "../../assets/icons/tokens/cake.svg";
import FTM from "../../assets/icons/tokens/FTM.png";
import { BASE18 } from "../../constance";

export const ftmTestnetAssets = [
  {
    name: "DAI",
    code: "DAI",
    reserveDecimals: BASE18.toFixed(),
    imgSrc: dai,
    underlyingAddress: "0xd77d0ED5314a6c50061361cBB7a4F26F2f11A301",
    interestRateParams: { uOptimal: 0.8, base: 0, slope1: 0.04, slope2: 0.75 },
    riskParams: { collateral: true, ltv: 0.75, threshold: 0.8, penalty: 0.05, reserveFactor: 0.1 },
  },
  {
    name: "USD Coin",
    code: "USDC",
    reserveDecimals: BASE18.toFixed(),
    imgSrc: usdc,
    underlyingAddress: "0xa865BAe90055920757b26dd7A5b2f7770919CB85",
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
    name: "Tether",
    code: "USDT",
    reserveDecimals: BASE18.toFixed(),
    imgSrc: usdt,
    underlyingAddress: "0x9e3E50d11e3acF636314f722ee43eD1a6a37a3ae",
    interestRateParams: { uOptimal: 0.8, base: 0, slope1: 0.04, slope2: 0.75 },
    riskParams: { collateral: false, ltv: 0.75, threshold: 0.8, penalty: 0.05, reserveFactor: 0.1 },
  },
  {
    name: "ETH",
    code: "ETH",
    reserveDecimals: BASE18.toFixed(),
    imgSrc: ETH,
    underlyingAddress: "0xA2EFf9462daA799e878519B1B64b3c3A1BCA9582",
    interestRateParams: { uOptimal: 0.65, base: 0, slope1: 0.08, slope2: 1 },
    riskParams: { collateral: true, ltv: 0.8, threshold: 0.825, penalty: 0.1, reserveFactor: 0.2 },
  },
  {
    name: "Binance Coin",
    code: "BNB",
    reserveDecimals: BASE18.toFixed(),
    imgSrc: BNB,
    underlyingAddress: "0xE85e615950C1948c2008F22A321B18D21F99D1C3",
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
    name: "Bitcoin",
    code: "BTCB",
    reserveDecimals: BASE18.toFixed(),
    imgSrc: BTCB,
    underlyingAddress: "0x1C791f44d7189159d205E8bFc394Ef233B1CCEF7",
    interestRateParams: { uOptimal: 1, base: 0.02, slope1: 0.1, slope2: 0 },
    riskParams: { collateral: false, ltv: 0.75, threshold: 0.8, penalty: 0.08, reserveFactor: 0.2 },
  },
  {
    name: "Binance USD",
    code: "BUSD",
    reserveDecimals: BASE18.toFixed(),
    imgSrc: busd,
    underlyingAddress: "0x0cbF778a5fCEBBB758a9b8845B74871a8b5D028a",
    interestRateParams: { uOptimal: 0.8, base: 0, slope1: 0.04, slope2: 0.218 },
    riskParams: { collateral: true, ltv: 0.75, threshold: 0.8, penalty: 0.08, reserveFactor: 0.1 },
  },
  {
    name: "Swipe",
    code: "SXP",
    reserveDecimals: BASE18.toFixed(),
    imgSrc: SXP,
    underlyingAddress: "0x86a6f9A36f10C0D44641866996DA3A93393A233A",
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
    underlyingAddress: "0x719d10f7A057ff4f4e53b9BCB018371392cF12B9",
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
    name: "Cardano",
    code: "ADA",
    reserveDecimals: BASE18.toFixed(),
    imgSrc: ADA,
    underlyingAddress: "0x831426e8e9e205Bf8eA9ce7743Ebe1a42Ff1ca5D",
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
    name: "XRP",
    code: "XRP",
    reserveDecimals: BASE18.toFixed(),
    imgSrc: XRP,
    underlyingAddress: "0x011C4D2b2171D41c8855Bb64718337f7Ac7bA5BB",
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
    name: "Litecoin",
    code: "LTC",
    reserveDecimals: BASE18.toFixed(),
    imgSrc: LTC,
    underlyingAddress: "0x4D6b81e0D7d7C27837503e9f33EBe925898719C8",
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
    underlyingAddress: "0x5e0541844d01206826e2806067D2dA23714f67B6",
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
    underlyingAddress: "0xE5081e1Af19B358752135286EE44959C73822093",
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
    underlyingAddress: "0x45f7e359351bC68AA402AC67Fa9fD670Bf2f8D88",
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
    name: "WFTM",
    code: "FTM",
    reserveDecimals: BASE18.toFixed(),
    imgSrc: FTM,
    underlyingAddress: "0xfda52e2D68d2d1F9C672460441aFb52ffC546c07",
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
    reserveDecimals: BASE18.toFixed(),
    underlyingAddress: "0x057Bd9458e401Ca226dB75f98DB99406779C03f6",
  },
];
