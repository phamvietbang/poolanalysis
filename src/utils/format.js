export function roundToTwo(num) {
  if (num < 0.01) {
    return 0;
  }
  return +(Math.round(num + "e+2") + "e-2");
}
export const ASSET_UNIT = {
  USD: 0,
  NATIVE: 1,
};
export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function formatAddress(address, number = 6) {
  return address.slice(0, number + 1) + "..." + address.slice(-(number - 1));
}

export function getMoneyFormatParts(moneyNumber) {
  const roundDegree = 6;
  if (moneyNumber) {
    return moneyNumber.toFixed(roundDegree).split(".");
  } else if (moneyNumber === 0) {
    return "0";
  } else {
    return "---";
  }
}

export function getPartBalance(balance) {
  if (balance <= 0.000001) {
    return ["0", ""];
  } else {
    let balancePart = getMoneyFormatParts(balance);
    return [balancePart[0], "." + balancePart[1]];
  }
}

export function formatHealthFactor(healthFactor) {
  if (healthFactor === null) {
    return " --";
  } else if (healthFactor > 100) {
    return " 100++";
  } else {
    return " " + roundToTwo(healthFactor);
  }
}

export function formatPoolInfor(unit, value, price) {
  if (unit === ASSET_UNIT.NATIVE) {
    return numberWithCommas(roundToTwo(value));
  } else {
    return numberWithCommas(roundToTwo(value * price));
  }
}
