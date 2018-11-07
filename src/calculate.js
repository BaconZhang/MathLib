import { isNumber, toNumber, compose, filterNumber } from "./lib";

const checkArgs = (target, name, descriptor) => {
  let value = descriptor.value;
  return {
    enumerable: true,
    configurable: true,
    writable: true,
    value: function(...args) {
      if ([...args].some(i => !isNumber(i))) {
        return NaN;
      }
      return value.apply(this, args);
    }
  };
};

const checkDivideArgs = (target, name, descriptor) => {
  let value = descriptor.value;
  return {
    enumerable: true,
    configurable: true,
    writable: true,
    value: function(...args) {
      if (!isNumber(args[1]) || toNumber(args[1]) === 0) {
        return NaN;
      }
      return value.apply(this, args);
    }
  };
};

const filterNums = (target, name, descriptor) => {
  let value = descriptor.value;
  return {
    enumerable: true,
    configurable: true,
    writable: true,
    value: function(...args) {
      if (!Array.isArray(args[0]) || args[0].every(i => !isNumber(i))) {
        return NaN;
      }
      return value.apply(this, args);
    }
  };
};

class Calculate {
  @checkArgs
  add(a, b) {
    return a + b;
  }

  @checkArgs
  minus(a, b) {
    return a - b;
  }

  @checkArgs
  multiply(a, b) {
    return a * b;
  }

  @checkDivideArgs
  @checkArgs
  divide(a, b) {
    return a / b;
  }

  @checkArgs
  abs(a) {
    return Math.abs(a);
  }

  @checkArgs
  sqrt(a) {
    return Math.sqrt(a);
  }

  @checkDivideArgs
  @checkArgs
  percent(a, b) {
    return compose(
      n => n * 100,
      ({ a, b }) => a / b
    )({ a, b });
  }

  @checkDivideArgs
  @checkArgs
  monthOnMonth(a, b) {
    return compose(
      num => (num / Math.abs(b)) * 100,
      ({ a, b }) => a - b
    )({ a, b });
  }

  @filterNums
  sum(nums) {
    return filterNumber(nums).reduce((prev, cur) => prev + toNumber(cur), 0);
  }

  @filterNums
  average(nums) {
    return compose(
      sum => sum / nums.length,
      nums => filterNumber(nums).reduce((prev, cur) => prev + toNumber(cur), 0)
    )(nums);
  }

  @filterNums
  max(nums) {
    return Math.max(...filterNumber(nums));
  }

  @filterNums
  min(nums) {
    return Math.min(...filterNumber(nums));
  }
}

export default new Calculate();
