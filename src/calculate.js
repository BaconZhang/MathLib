import { isNumber, toNumber, compose, filterNumber } from "./lib";

const add = (a, b) =>
  isNumber(a) && isNumber(b) ? toNumber(a) + toNumber(b) : NaN;
const minus = (a, b) =>
  isNumber(a) && isNumber(b) ? toNumber(a) - toNumber(b) : NaN;
const multiply = (a, b) =>
  isNumber(a) && isNumber(b) ? toNumber(a) * toNumber(b) : NaN;
const divide = (a, b) =>
  isNumber(a) && isNumber(b) && toNumber(b) !== 0 ? a / b : NaN;
const abs = a => (isNumber(a) ? Math.abs(a) : NaN);
const sqrt = a => (isNumber(a) && a >= 0 ? Math.sqrt(a) : NaN);

const percent = (a, b) =>
  isNumber(a) && isNumber(b) && toNumber(b) !== 0
    ? compose(
        num => multiply(num, 100),
        ({ a, b }) => divide(a, b)
      )({ a, b })
    : NaN;
const sum = set =>
  compose(
    set =>
      set.length ? set.reduce((prev, cur) => prev + toNumber(cur), 0) : NaN,
    set => filterNumber(set)
  )(set);
const average = set =>
  Array.isArray(set) && set.length
    ? compose(
        sum => divide(sum, set.length),
        set => sum(set)
      )(set)
    : NaN;
const monthOnMonth = (a, b) =>
  compose(
    num => percent(num, abs(b)),
    ({ a, b }) => minus(a, b)
  )({ a, b });
const max = set =>
  compose(
    set => (set.length ? Math.max(...set) : NaN),
    set => filterNumber(set)
  )(set);
const min = set =>
  compose(
    set => (set.length ? Math.min(...set) : NaN),
    set => filterNumber(set)
  )(set);

export default {
  add,
  minus,
  multiply,
  divide,
  percent,
  sum,
  average,
  monthOnMonth,
  abs,
  sqrt,
  max,
  min
};
