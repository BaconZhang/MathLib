import { isNumber, toNumber, overLimit, compose } from "./lib";
import calculate from "./calculate";
const { abs } = calculate;

const display = (num, fix = 2, transLargeNumber = true) => {
  let [fix1, fix2, fix3] = Array.isArray(fix)
    ? fix
    : Array.from({ length: 3 }, (_, index) => fix);
  let transformedNum = toNumber(num);
  if (isNumber(transformedNum)) {
    if (transLargeNumber) {
      if (transformedNum > 100000000) {
        return (transformedNum / 100000000).toFixed(fix1) + "亿";
      } else if (transformedNum >= 1000000) {
        let temp = (transformedNum / 10000).toFixed(fix2);
        return overLimit(temp, 10000) ? `${(1).toFixed(fix2)}亿` : `${temp}万`;
      } else {
        let temp = transformedNum.toFixed(fix3);
        return overLimit(temp, 1000000) ? `${(100).toFixed(fix2)}万` : temp;
      }
    } else {
      return transformedNum.toFixed(fix3);
    }
  } else {
    return "--";
  }
};

const localeDisplay = (num, fix = 2) => {
  const transformedNum = toNumber(num);
  if (isNumber(transformedNum)) {
    let fixNum = abs(num).toFixed(fix);
    let tempArr = fixNum.split(".");
    tempArr[0] = tempArr[0]
      .split("")
      .reverse()
      .reduce((prev, cur, curIndex, array) => {
        prev += cur;
        if ((curIndex + 1) % 3 === 0 && curIndex !== array.length - 1) {
          prev += ",";
        }
        return prev;
      }, "")
      .split("")
      .reverse()
      .join("");
    return `${num < 0 ? "-" : ""}${tempArr.join(".")}`;
  } else {
    return "--";
  }
};

export default {
  display,
  localeDisplay
};
