import MathLib from "../index";
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
  localeDisplay,
  echarts,
  energy
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
  expect(display(num2, 0, true, [100000000])).toBe("11亿");
  const num3 = 99990000;
  expect(display(num3, 0, true)).toBe("9999万");
  expect(display(num3, 2, true)).toBe("9999.00万");
  expect(display(num3, 2, false)).toBe("99990000.00");
  expect(display(num3, 0, true, 100000000)).toBe("99990000");
  expect(display(num3, 0, true, 10000)).toBe("9999万");
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

test("echarts.getMinMax", () => {
  const tests0 = [null, null, undefined];
  const tests1 = [520, 1024, 9500, null];
  const tests2 = [120, 323, 233];
  const tests3 = [10280, 200, 1024, 9500, null];
  const tests4 = [10280, 1520, 1024, 9500, null];
  const tests5 = [10280, 300, 1024, 9500, null];
  expect(echarts.getMinMax(tests0)).toEqual({ min: NaN, max: NaN });
  expect(echarts.getMinMax(tests1)).toEqual({ min: 0, max: 10000 });
  expect(echarts.getMinMax(tests2)).toEqual({ min: 100, max: 400 });
  expect(echarts.getMinMax(tests3)).toEqual({ min: 0, max: 20000 });
  expect(echarts.getMinMax(tests4)).toEqual({ min: 1000, max: 11000 });
  expect(echarts.getMinMax(tests5)).toEqual({ min: 0, max: 11000 });
});

test("energy.factor", () => {
  const standards = [90, 85, 80];
  const tests = {
    90: [0.95, 0.9, 0.85, 0.65, 0.6, 0.5],
    85: [0.95, 0.9, 0.85, 0.65, 0.6, 0.5],
    80: [0.95, 0.9, 0.8, 0.6, 0.55, 0.5]
  };
  const results = standards.map(standard => {
    let test = tests[standard];
    return test.map(i => energy.factor(i, standard));
  });
  expect(results[0]).toEqual([-0.75, -0, 2.5, 15, 25, 45]);
  expect(results[1]).toEqual([-1.1, -0.5, -0, 10, 15, 35]);
  expect(results[2]).toEqual([-1.3, -1, -0, 10, 15, 25]);
  expect(energy.factor(null)).toBe(NaN);
});
