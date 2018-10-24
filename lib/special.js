"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lib = require("./lib");

var _calculate = _interopRequireDefault(require("./calculate"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var multiply = _calculate.default.multiply,
  minus = _calculate.default.minus,
  divide = _calculate.default.divide,
  min = _calculate.default.min,
  max = _calculate.default.max;
/*
  * echarts 为echarts画图准备的一些方法
*/

var echarts = {
  getMinMax: function getMinMax(arr) {
    var temp = (0, _lib.filterNumber)(arr);
    var minVal = min(temp);
    var maxVal = max(temp);

    if ((0, _lib.isNumber)(minVal) && (0, _lib.isNumber)(maxVal)) {
      var logLevel = Math.pow(10, Math.floor(Math.log10(maxVal - minVal)));
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

var energy = {
  factor: function factor(cosq) {
    var standard =
      arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 90;
    var score = Math.round(multiply(cosq, 100));
    var diff = minus(90, standard);

    if (!(0, _lib.isNumber)(score)) {
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
var special = {
  echarts: echarts,
  energy: energy
};
var _default = special;
exports.default = _default;
