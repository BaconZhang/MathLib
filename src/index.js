import calculate from "./calculate";
import display from "./display";
import special from "./special";
import { isNumber, compose, toNumber, filterNumber } from "./lib";

export default {
  ...calculate,
  ...display,
  isNumber,
  compose,
  toNumber,
  filterNumber,
  ...special
};
