import calculate from "./calculate";
import display from "./display";
import special from "./special";
import { isNumber, compose, toNumber, filterNumber } from "./lib";

export default {
  // ...calculate,
  add: calculate.add,
  minus: calculate.minus,
  multiply: calculate.multiply,
  divide: calculate.divide,
  percent: calculate.percent,
  sum: calculate.sum,
  average: calculate.average,
  monthOnMonth: calculate.monthOnMonth,
  abs: calculate.abs,
  sqrt: calculate.sqrt,
  max: calculate.max,
  min: calculate.min,
  ...display,
  isNumber,
  compose,
  toNumber,
  filterNumber,
  ...special
};
