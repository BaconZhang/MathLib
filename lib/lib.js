"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.filterNumber = exports.overLimit = exports.isNumber = exports.toNumber = exports.compose = void 0;

var compose = function compose() {
  for (
    var _len = arguments.length, fns = new Array(_len), _key = 0;
    _key < _len;
    _key++
  ) {
    fns[_key] = arguments[_key];
  }

  return function(value) {
    return fns
      .concat()
      .reverse()
      .reduce(function(prev, fn) {
        return fn(prev);
      }, value);
  };
};

exports.compose = compose;

var toNumber = function toNumber(num) {
  return /(-?\d+)(\.\d+)?$/.test(num) ? parseFloat(num) : NaN;
};

exports.toNumber = toNumber;

var isNumber = function isNumber(num) {
  return !isNaN(toNumber(num)) && isFinite(toNumber(num));
};

exports.isNumber = isNumber;

var overLimit = function overLimit(num, limit) {
  return toNumber(num) >= limit;
};

exports.overLimit = overLimit;

var filterNumber = function filterNumber(dataSet) {
  return Array.isArray(dataSet)
    ? dataSet
        .filter(function(num) {
          return isNumber(num);
        })
        .map(function(num) {
          return toNumber(num);
        })
    : [];
};

exports.filterNumber = filterNumber;
