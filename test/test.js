import MathLib from "../lib/index";
const {
  isNumber,
  compose,
  toNumber,
  filterNumber,
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
  min,
  display,
  localeDisplay
} = MathLib;

test("toNumber", () => {
  const tests = [null, undefined, "5abc", "100", 10001, "-5", 5.1];
  const result = [NaN, NaN, NaN, 100, 10001, -5, 5.1];
  tests.forEach((i, index) => {
    expect(toNumber(i)).toBe(result[index]);
  });
});

test("isNumber", () => {
  const tests = [null, undefined, "5abc", "100", 10001];
  const result = [false, false, false, true, true];
  tests.forEach((i, index) => {
    expect(isNumber(i)).toBe(result[index]);
  });
  expect(isNumber(Infinity)).toBe(false);
});

test("filterNumber", () => {
  const tests = [null, undefined, "5abc", "100", 10001, "-5", 5.1];
  const result = [100, 10001, -5, 5.1];
  expect(filterNumber(tests)).toEqual(result);
  expect(filterNumber(5)).toEqual([]);
});

test("display", () => {
  const num1 = 1000000000;
  expect(display(num1, 0, true)).toBe("10亿");
  expect(display(num1, 2, true)).toBe("10.00亿");
  expect(display(num1, 2, false)).toBe("1000000000.00");
  const num2 = 1055500000;
  expect(display(num2, 0, true)).toBe("11亿");
  expect(display(num2, 2, true)).toBe("10.55亿");
  expect(display(num2, 2, false)).toBe("1055500000.00");
  const num3 = 99990000;
  expect(display(num3, 0, true)).toBe("9999万");
  expect(display(num3, 2, true)).toBe("9999.00万");
  expect(display(num3, 2, false)).toBe("99990000.00");
  const num4 = null;
  expect(display(num4)).toBe("--");
  const num5 = 1000;
  expect(display(num5, 0)).toBe("1000");
});

test("localDisplay", () => {
  const num1 = 1000000000;
  expect(localeDisplay(num1, 0)).toBe("1,000,000,000");
  const num2 = 1000000000.0;
  expect(localeDisplay(num2, 2)).toBe("1,000,000,000.00");
  const num3 = null;
  expect(localeDisplay(num3)).toBe("--");
});

test("add", () => {
  expect(add(1, 1)).toBe(2);
  expect(add(1, null)).toBe(NaN);
});

test("minus", () => {
  expect(minus(1, 1)).toBe(0);
  expect(minus(1, null)).toBe(NaN);
});

test("multiply", () => {
  expect(multiply(1, 1)).toBe(1);
  expect(multiply(1, null)).toBe(NaN);
});

test("divide", () => {
  expect(divide(1, 1)).toBe(1);
  expect(divide(1, null)).toBe(NaN);
  expect(divide(1, 0)).toBe(NaN);
});

test("percent", () => {
  expect(percent(1, 1)).toBe(100);
  expect(percent(0.5, 1)).toBe(50);
  expect(percent(1, 0)).toBe(NaN);
  expect(percent(1, null)).toBe(NaN);
});

test("sum", () => {
  expect(sum([1, 1, null, NaN])).toBe(2);
  expect(sum([null, NaN])).toBe(NaN);
});

test("average", () => {
  expect(average([1, 1, null, NaN])).toBe(0.5);
  expect(average([null, NaN])).toBe(NaN);
});

test("monthOnMonth", () => {
  expect(monthOnMonth(1, 0.5)).toBe(100);
  expect(monthOnMonth(1, 0)).toBe(NaN);
  expect(monthOnMonth(1, null)).toBe(NaN);
});

test("max", () => {
  expect(max([1, 2, null, NaN])).toBe(2);
  expect(max([null, NaN])).toBe(NaN);
});

test("min", () => {
  expect(min([1, 2, null, NaN])).toBe(1);
  expect(min([null, NaN])).toBe(NaN);
});

test("sqrt", () => {
  expect(sqrt(4)).toBe(2);
  expect(sqrt(null)).toBe(NaN);
});

test("abs", () => {
  expect(abs(4)).toBe(4);
  expect(abs(-4)).toBe(4);
  expect(abs(null)).toBe(NaN);
});
