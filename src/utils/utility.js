export function fixedLargeNumber(number, fractionDigits) {
  const floatNumber = parseFloat(number);
  if (floatNumber < 1000) return floatNumber.toFixed(fractionDigits);
  let temp = floatNumber / 1000;
  if (temp < 1000) {
    const tempK = temp.toFixed(fractionDigits);
    if (tempK < temp) return `${tempK}K+`;
    else return `${tempK}K`;
  } else if (temp < 1e6) {
    temp = temp / 1000;
    const tempM = temp.toFixed(fractionDigits);
    if (tempM < temp) return `${tempM}M+`;
    else return `${tempM}M`;
  } else {
    temp = temp / 1e6;
    const tempB = temp.toFixed(fractionDigits);
    if (tempB < temp) return `${tempB}B+`;
    else return `${tempB}B`;
  }
}

export function formatAddress(address) {
  return address.slice(0, 6) + "..." + address.slice(-6);
}

export function isNumeric(num) {
  return !isNaN(num) && !isNaN(parseFloat(num));
}

export function numberWithCommas(x, fractionDigits) {
  const [naturalPart, decimalPart] = x.toString().split(".");
  let out = naturalPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  if (decimalPart) {
    if (!isNumeric(fractionDigits)) {
      out += "." + decimalPart;
    } else if (decimalPart.length >= fractionDigits) {
      out += "." + decimalPart.substr(0, fractionDigits);
    } else {
      out += "." + decimalPart + "0".repeat(fractionDigits - decimalPart.length);
    }
  }
  return out;
}

export function convertTimestampToDate(timestamp) {
  var a = new Date(timestamp);
  var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  return { year, month, date, hour, min, sec };
}

