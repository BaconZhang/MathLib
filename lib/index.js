"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _calculate = _interopRequireDefault(require("./calculate"));

var _display = _interopRequireDefault(require("./display"));

var _special = _interopRequireDefault(require("./special"));

var _lib = require("./lib");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);
    if (typeof Object.getOwnPropertySymbols === "function") {
      ownKeys = ownKeys.concat(
        Object.getOwnPropertySymbols(source).filter(function(sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        })
      );
    }
    ownKeys.forEach(function(key) {
      _defineProperty(target, key, source[key]);
    });
  }
  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

var _default = _objectSpread(
  {
    // ...calculate,
    add: _calculate.default.add,
    minus: _calculate.default.minus,
    multiply: _calculate.default.multiply,
    divide: _calculate.default.divide,
    percent: _calculate.default.percent,
    sum: _calculate.default.sum,
    average: _calculate.default.average,
    monthOnMonth: _calculate.default.monthOnMonth,
    abs: _calculate.default.abs,
    sqrt: _calculate.default.sqrt,
    max: _calculate.default.max,
    min: _calculate.default.min
  },
  _display.default,
  {
    isNumber: _lib.isNumber,
    compose: _lib.compose,
    toNumber: _lib.toNumber,
    filterNumber: _lib.filterNumber
  },
  _special.default
);

exports.default = _default;
