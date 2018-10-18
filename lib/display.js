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

function _slicedToArray(arr, i) {
  return (
    _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest()
  );
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

function _iterableToArrayLimit(arr, i) {
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;
  try {
    for (
      var _i = arr[Symbol.iterator](), _s;
      !(_n = (_s = _i.next()).done);
      _n = true
    ) {
      _arr.push(_s.value);
      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }
  return _arr;
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

var abs = _calculate.default.abs;

var display = function display(num) {
  var fix =
    arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
  var transLargeNumber =
    arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

  var _ref = Array.isArray(fix)
      ? fix
      : Array.from(
          {
            length: 3
          },
          function(_, index) {
            return fix;
          }
        ),
    _ref2 = _slicedToArray(_ref, 3),
    fix1 = _ref2[0],
    fix2 = _ref2[1],
    fix3 = _ref2[2];

  var transformedNum = (0, _lib.toNumber)(num);

  if ((0, _lib.isNumber)(transformedNum)) {
    if (transLargeNumber) {
      if (transformedNum > 100000000) {
        return (transformedNum / 100000000).toFixed(fix1) + "亿";
      } else if (transformedNum >= 1000000) {
        var temp = (transformedNum / 10000).toFixed(fix2);
        return (0, _lib.overLimit)(temp, 10000)
          ? "".concat((1).toFixed(fix2), "\u4EBF")
          : "".concat(temp, "\u4E07");
      } else {
        var _temp = transformedNum.toFixed(fix3);

        return (0, _lib.overLimit)(_temp, 1000000)
          ? "".concat((100).toFixed(fix2), "\u4E07")
          : _temp;
      }
    } else {
      return transformedNum.toFixed(fix3);
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
