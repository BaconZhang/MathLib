import { isNumber, toNumber, overLimit, compose } from "./lib";
import calculate from "./calculate";
const { abs } = calculate;

// const display = (num, fix = 2, transLargeNumber = true) => {
//   let [fix1, fix2, fix3] = Array.isArray(fix)
//     ? fix
//     : Array.from({ length: 3 }, (_, index) => fix);
//   let transformedNum = toNumber(num);
//   if (isNumber(transformedNum)) {
//     if (transLargeNumber) {
//       if (transformedNum > 100000000) {
//         return (transformedNum / 100000000).toFixed(fix1) + "亿";
//       } else if (transformedNum >= 1000000) {
//         let temp = (transformedNum / 10000).toFixed(fix2);
//         return overLimit(temp, 10000) ? `${(1).toFixed(fix2)}亿` : `${temp}万`;
//       } else {
//         let temp = transformedNum.toFixed(fix3);
//         return overLimit(temp, 1000000) ? `${(100).toFixed(fix2)}万` : temp;
//       }
//     } else {
//       return transformedNum.toFixed(fix3);
//     }
//   } else {
//     return "--";
//   }
// };
const NUM_LEVELS = {
  亿: [100000000],
  万: [10000, 1000000, 10000000],
  千: [1000]
};
const LEVEL_LABEL = {
  亿: 100000000,
  万: 10000,
  千: 1000
};
const getFix = (fix, length) => {
  if (Array.isArray(fix)) {
    return fix.length === length
      ? fix
      : Array.from({ length }, (_, index) => fix[0] || 2);
  } else {
    return Array.from({ length }, (_, index) => fix);
  }
};
const getLabel = num => {
  return Object.keys(NUM_LEVELS).find(key =>
    NUM_LEVELS[key].includes(toNumber(num))
  );
};
/*
  @ {num} 待显示的数字，Infinite、-Infinite、NaN以及其他的不可转为数字的均显示为'--'
  @ {fix} 保留几位小数，采用银行家算法：四舍六入五考虑，五后非零就进一，五后为零看奇偶，五前为偶应舍去，五前为奇要进一
  @ {transLargeNumber} 是否要转换显示大数字，超过100万显示为xxx万，超过1亿显示为xxx亿
  @ {levels} 分隔数字，默认是1亿和100万
*/
const display = (
  num,
  toFix = 2,
  transLargeNumber = true,
  levels = [100000000, 1000000]
) => {
  levels = Array.isArray(levels) ? levels : [levels];
  let fix = getFix(toFix, levels.length + 1);
  let transformedNum = toNumber(num);
  if (isNumber(transformedNum)) {
    if (transLargeNumber) {
      let index = levels.findIndex(i => transformedNum >= i);
      let realIndex = index > -1 ? index : levels.length;
      const label = index > -1 ? getLabel(levels[index]) : "";
      const divide = index > -1 ? LEVEL_LABEL[label] : 1;
      const num = (transformedNum / divide).toFixed(fix[realIndex]);
      // 判断是否越界
      if (realIndex >= 1 && overLimit(num * divide, levels[realIndex - 1])) {
        const largeLabel = getLabel(levels[realIndex - 1]);
        const largeDivide = LEVEL_LABEL[largeLabel];
        return `${(levels[realIndex - 1] / largeDivide).toFixed(
          fix[realIndex - 1]
        )}${largeLabel}`;
      } else {
        return `${num}${label}`;
      }
    } else {
      return transformedNum.toFixed(fix[fix.length - 1]);
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
