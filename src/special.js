import { filterNumber, isNumber } from "./lib";
import calculate from "./calculate";
const { multiply, minus, divide, min, max } = calculate;
/*
  * echarts 为echarts画图准备的一些方法
*/
const echarts = {
  getMinMax: arr => {
    let temp = filterNumber(arr);
    let minVal = min(temp);
    let maxVal = max(temp);
    if (isNumber(minVal) && isNumber(maxVal)) {
      let logLevel = Math.pow(10, Math.floor(Math.log10(maxVal - minVal)));
      return {
        min: Math.floor(minVal / logLevel) * logLevel,
        max: Math.ceil(maxVal / logLevel) * logLevel
      };
    } else {
      return {
        min: minVal,
        max: maxVal
      };
    }
  }
};
/*
  * energy 为能源业务准备的一些方法
*/
const energy = {
  factor: (cosq, standard = 90) => {
    let score = Math.round(multiply(cosq, 100));
    let diff = minus(90, standard);
    if (!isNumber(score)) {
      return NaN;
    } else if (score >= 95 - divide(diff, 5)) {
      return 0.003 * diff * diff - 0.085 * diff - 0.75; // 拟合了一个二次函数，适配90, 85, 80三种情况
    } else if (score >= 90) {
      return -0.1 * diff - 0.15 * (score - 90);
    } else if (score >= standard) {
      return -0.15 * (score - standard);
    } else if (score >= standard - 20) {
      return (standard - score) * 0.5;
    } else if (score >= standard - 25) {
      return 10 + (standard - 20 - score) * 1.0;
    } else {
      return 15 + (standard - 25 - score) * 2.0;
    }
  }
};

const special = {
  echarts,
  energy
};

export default special;
