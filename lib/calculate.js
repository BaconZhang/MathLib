"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lib = require("./lib");

function _toConsumableArray(arr) {
  return (
    _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread()
  );
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

function _iterableToArray(iter) {
  if (
    Symbol.iterator in Object(iter) ||
    Object.prototype.toString.call(iter) === "[object Arguments]"
  )
    return Array.from(iter);
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }
    return arr2;
  }
}

var add = function add(a, b) {
  return (0, _lib.isNumber)(a) && (0, _lib.isNumber)(b)
    ? (0, _lib.toNumber)(a) + (0, _lib.toNumber)(b)
    : NaN;
};

var minus = function minus(a, b) {
  return (0, _lib.isNumber)(a) && (0, _lib.isNumber)(b)
    ? (0, _lib.toNumber)(a) - (0, _lib.toNumber)(b)
    : NaN;
};

var multiply = function multiply(a, b) {
  return (0, _lib.isNumber)(a) && (0, _lib.isNumber)(b)
    ? (0, _lib.toNumber)(a) * (0, _lib.toNumber)(b)
    : NaN;
};

var divide = function divide(a, b) {
  return (0, _lib.isNumber)(a) &&
    (0, _lib.isNumber)(b) &&
    (0, _lib.toNumber)(b) !== 0
    ? a / b
    : NaN;
};

var abs = function abs(a) {
  return (0, _lib.isNumber)(a) ? Math.abs(a) : NaN;
};

var sqrt = function sqrt(a) {
  return (0, _lib.isNumber)(a) && a >= 0 ? Math.sqrt(a) : NaN;
};

var percent = function percent(a, b) {
  return (0, _lib.isNumber)(a) &&
    (0, _lib.isNumber)(b) &&
    (0, _lib.toNumber)(b) !== 0
    ? (0, _lib.compose)(
        function(num) {
          return multiply(num, 100);
        },
        function(_ref) {
          var a = _ref.a,
            b = _ref.b;
          return divide(a, b);
        }
      )({
        a: a,
        b: b
      })
    : NaN;
};

var sum = function sum(set) {
  return (0, _lib.compose)(
    function(set) {
      return set.length
        ? set.reduce(function(prev, cur) {
            return prev + (0, _lib.toNumber)(cur);
          }, 0)
        : NaN;
    },
    function(set) {
      return (0, _lib.filterNumber)(set);
    }
  )(set);
};

var average = function average(set) {
  return Array.isArray(set) && set.length
    ? (0, _lib.compose)(
        function(sum) {
          return divide(sum, set.length);
        },
        function(set) {
          return sum(set);
        }
      )(set)
    : NaN;
};

var monthOnMonth = function monthOnMonth(a, b) {
  return (0, _lib.compose)(
    function(num) {
      return percent(num, abs(b));
    },
    function(_ref2) {
      var a = _ref2.a,
        b = _ref2.b;
      return minus(a, b);
    }
  )({
    a: a,
    b: b
  });
};

var max = function max(set) {
  return (0, _lib.compose)(
    function(set) {
      return set.length ? Math.max.apply(Math, _toConsumableArray(set)) : NaN;
    },
    function(set) {
      return (0, _lib.filterNumber)(set);
    }
  )(set);
};

var min = function min(set) {
  return (0, _lib.compose)(
    function(set) {
      return set.length ? Math.min.apply(Math, _toConsumableArray(set)) : NaN;
    },
    function(set) {
      return (0, _lib.filterNumber)(set);
    }
  )(set);
};

var _default = {
  add: add,
  minus: minus,
  multiply: multiply,
  divide: divide,
  percent: percent,
  sum: sum,
  average: average,
  monthOnMonth: monthOnMonth,
  abs: abs,
  sqrt: sqrt,
  max: max,
  min: min
};
exports.default = _default;
