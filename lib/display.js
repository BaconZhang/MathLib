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

var abs = _calculate.default.abs; // const display = (num, fix = 2, transLargeNumber = true) => {
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

var NUM_LEVELS = {
  亿: [100000000],
  万: [10000, 1000000, 10000000],
  千: [1000]
};
var LEVEL_LABEL = {
  亿: 100000000,
  万: 10000,
  千: 1000
};

var getFix = function getFix(fix, length) {
  if (Array.isArray(fix)) {
    return fix.length === length
      ? fix
      : Array.from(
          {
            length: length
          },
          function(_, index) {
            return fix[0] || 2;
          }
        );
  } else {
    return Array.from(
      {
        length: length
      },
      function(_, index) {
        return fix;
      }
    );
  }
};

var getLabel = function getLabel(num) {
  return Object.keys(NUM_LEVELS).find(function(key) {
    return NUM_LEVELS[key].includes((0, _lib.toNumber)(num));
  });
};
/*
  @ {num} 待显示的数字，Infinite、-Infinite、NaN以及其他的不可转为数字的均显示为'--'
  @ {fix} 保留几位小数，采用银行家算法：四舍六入五考虑，五后非零就进一，五后为零看奇偶，五前为偶应舍去，五前为奇要进一
  @ {transLargeNumber} 是否要转换显示大数字，超过100万显示为xxx万，超过1亿显示为xxx亿
  @ {levels} 分隔数字，默认是1亿和100万
*/

var display = function display(num) {
  var toFix =
    arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
  var transLargeNumber =
    arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  var levels =
    arguments.length > 3 && arguments[3] !== undefined
      ? arguments[3]
      : [100000000, 1000000];
  levels = Array.isArray(levels) ? levels : [levels];
  var fix = getFix(toFix, levels.length + 1);
  var transformedNum = (0, _lib.toNumber)(num);

  if ((0, _lib.isNumber)(transformedNum)) {
    if (transLargeNumber) {
      var index = levels.findIndex(function(i) {
        return transformedNum >= i;
      });
      var realIndex = index > -1 ? index : levels.length;
      var label = index > -1 ? getLabel(levels[index]) : "";
      var divide = index > -1 ? LEVEL_LABEL[label] : 1;

      var _num = (transformedNum / divide).toFixed(fix[realIndex]); // 判断是否越界

      if (
        realIndex >= 1 &&
        (0, _lib.overLimit)(_num * divide, levels[realIndex - 1])
      ) {
        var largeLabel = getLabel(levels[realIndex - 1]);
        var largeDivide = LEVEL_LABEL[largeLabel];
        return ""
          .concat(
            (levels[realIndex - 1] / largeDivide).toFixed(fix[realIndex - 1])
          )
          .concat(largeLabel);
      } else {
        return "".concat(_num).concat(label);
      }
    } else {
      return transformedNum.toFixed(fix[fix.length - 1]);
    }
  } else {
    return "--";
  }
};

var localeDisplay = function localeDisplay(num) {
  var fix =
    arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
  var transformedNum = (0, _lib.toNumber)(num);

  if ((0, _lib.isNumber)(transformedNum)) {
    var fixNum = abs(num).toFixed(fix);
    var tempArr = fixNum.split(".");
    tempArr[0] = tempArr[0]
      .split("")
      .reverse()
      .reduce(function(prev, cur, curIndex, array) {
        prev += cur;

        if ((curIndex + 1) % 3 === 0 && curIndex !== array.length - 1) {
          prev += ",";
        }

        return prev;
      }, "")
      .split("")
      .reverse()
      .join("");
    return "".concat(num < 0 ? "-" : "").concat(tempArr.join("."));
  } else {
    return "--";
  }
};

var _default = {
  display: display,
  localeDisplay: localeDisplay
};
exports.default = _default;
