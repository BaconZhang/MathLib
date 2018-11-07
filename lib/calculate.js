"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lib = require("./lib");

var _class;

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

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _applyDecoratedDescriptor(
  target,
  property,
  decorators,
  descriptor,
  context
) {
  var desc = {};
  Object["ke" + "ys"](descriptor).forEach(function(key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;
  if ("value" in desc || desc.initializer) {
    desc.writable = true;
  }
  desc = decorators
    .slice()
    .reverse()
    .reduce(function(desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);
  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }
  if (desc.initializer === void 0) {
    Object["define" + "Property"](target, property, desc);
    desc = null;
  }
  return desc;
}

var checkArgs = function checkArgs(target, name, descriptor) {
  var _value = descriptor.value;
  return {
    enumerable: true,
    configurable: true,
    writable: true,
    value: function value() {
      for (
        var _len = arguments.length, args = new Array(_len), _key = 0;
        _key < _len;
        _key++
      ) {
        args[_key] = arguments[_key];
      }

      if (
        args.concat().some(function(i) {
          return !(0, _lib.isNumber)(i);
        })
      ) {
        return NaN;
      }

      return _value.apply(this, args);
    }
  };
};

var checkDivideArgs = function checkDivideArgs(target, name, descriptor) {
  var _value2 = descriptor.value;
  return {
    enumerable: true,
    configurable: true,
    writable: true,
    value: function value() {
      for (
        var _len2 = arguments.length, args = new Array(_len2), _key2 = 0;
        _key2 < _len2;
        _key2++
      ) {
        args[_key2] = arguments[_key2];
      }

      if (!(0, _lib.isNumber)(args[1]) || (0, _lib.toNumber)(args[1]) === 0) {
        return NaN;
      }

      return _value2.apply(this, args);
    }
  };
};

var filterNums = function filterNums(target, name, descriptor) {
  var _value3 = descriptor.value;
  return {
    enumerable: true,
    configurable: true,
    writable: true,
    value: function value() {
      for (
        var _len3 = arguments.length, args = new Array(_len3), _key3 = 0;
        _key3 < _len3;
        _key3++
      ) {
        args[_key3] = arguments[_key3];
      }

      if (
        !Array.isArray(args[0]) ||
        args[0].every(function(i) {
          return !(0, _lib.isNumber)(i);
        })
      ) {
        return NaN;
      }

      return _value3.apply(this, args);
    }
  };
};

var Calculate = ((_class =
  /*#__PURE__*/
  (function() {
    function Calculate() {
      _classCallCheck(this, Calculate);
    }

    _createClass(Calculate, [
      {
        key: "add",
        value: function add(a, b) {
          return a + b;
        }
      },
      {
        key: "minus",
        value: function minus(a, b) {
          return a - b;
        }
      },
      {
        key: "multiply",
        value: function multiply(a, b) {
          return a * b;
        }
      },
      {
        key: "divide",
        value: function divide(a, b) {
          return a / b;
        }
      },
      {
        key: "abs",
        value: function abs(a) {
          return Math.abs(a);
        }
      },
      {
        key: "sqrt",
        value: function sqrt(a) {
          return Math.sqrt(a);
        }
      },
      {
        key: "percent",
        value: function percent(a, b) {
          return (0, _lib.compose)(
            function(n) {
              return n * 100;
            },
            function(_ref) {
              var a = _ref.a,
                b = _ref.b;
              return a / b;
            }
          )({
            a: a,
            b: b
          });
        }
      },
      {
        key: "monthOnMonth",
        value: function monthOnMonth(a, b) {
          return (0, _lib.compose)(
            function(num) {
              return (num / Math.abs(b)) * 100;
            },
            function(_ref2) {
              var a = _ref2.a,
                b = _ref2.b;
              return a - b;
            }
          )({
            a: a,
            b: b
          });
        }
      },
      {
        key: "sum",
        value: function sum(nums) {
          return (0, _lib.filterNumber)(nums).reduce(function(prev, cur) {
            return prev + (0, _lib.toNumber)(cur);
          }, 0);
        }
      },
      {
        key: "average",
        value: function average(nums) {
          return (0, _lib.compose)(
            function(sum) {
              return sum / nums.length;
            },
            function(nums) {
              return (0, _lib.filterNumber)(nums).reduce(function(prev, cur) {
                return prev + (0, _lib.toNumber)(cur);
              }, 0);
            }
          )(nums);
        }
      },
      {
        key: "max",
        value: function max(nums) {
          return Math.max.apply(
            Math,
            _toConsumableArray((0, _lib.filterNumber)(nums))
          );
        }
      },
      {
        key: "min",
        value: function min(nums) {
          return Math.min.apply(
            Math,
            _toConsumableArray((0, _lib.filterNumber)(nums))
          );
        }
      }
    ]);

    return Calculate;
  })()),
(_applyDecoratedDescriptor(
  _class.prototype,
  "add",
  [checkArgs],
  Object.getOwnPropertyDescriptor(_class.prototype, "add"),
  _class.prototype
),
_applyDecoratedDescriptor(
  _class.prototype,
  "minus",
  [checkArgs],
  Object.getOwnPropertyDescriptor(_class.prototype, "minus"),
  _class.prototype
),
_applyDecoratedDescriptor(
  _class.prototype,
  "multiply",
  [checkArgs],
  Object.getOwnPropertyDescriptor(_class.prototype, "multiply"),
  _class.prototype
),
_applyDecoratedDescriptor(
  _class.prototype,
  "divide",
  [checkDivideArgs, checkArgs],
  Object.getOwnPropertyDescriptor(_class.prototype, "divide"),
  _class.prototype
),
_applyDecoratedDescriptor(
  _class.prototype,
  "abs",
  [checkArgs],
  Object.getOwnPropertyDescriptor(_class.prototype, "abs"),
  _class.prototype
),
_applyDecoratedDescriptor(
  _class.prototype,
  "sqrt",
  [checkArgs],
  Object.getOwnPropertyDescriptor(_class.prototype, "sqrt"),
  _class.prototype
),
_applyDecoratedDescriptor(
  _class.prototype,
  "percent",
  [checkDivideArgs, checkArgs],
  Object.getOwnPropertyDescriptor(_class.prototype, "percent"),
  _class.prototype
),
_applyDecoratedDescriptor(
  _class.prototype,
  "monthOnMonth",
  [checkDivideArgs, checkArgs],
  Object.getOwnPropertyDescriptor(_class.prototype, "monthOnMonth"),
  _class.prototype
),
_applyDecoratedDescriptor(
  _class.prototype,
  "sum",
  [filterNums],
  Object.getOwnPropertyDescriptor(_class.prototype, "sum"),
  _class.prototype
),
_applyDecoratedDescriptor(
  _class.prototype,
  "average",
  [filterNums],
  Object.getOwnPropertyDescriptor(_class.prototype, "average"),
  _class.prototype
),
_applyDecoratedDescriptor(
  _class.prototype,
  "max",
  [filterNums],
  Object.getOwnPropertyDescriptor(_class.prototype, "max"),
  _class.prototype
),
_applyDecoratedDescriptor(
  _class.prototype,
  "min",
  [filterNums],
  Object.getOwnPropertyDescriptor(_class.prototype, "min"),
  _class.prototype
)),
_class);

var _default = new Calculate();

exports.default = _default;
