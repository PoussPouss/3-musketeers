'use strict';

const convert = require('..');
const Big = require('big.js');

test('should default to returning a Number', () => {
  expect(typeof(convert(2, 'BTC', 'BTC'))).toBe("number");
  //throw new Error('test not yet defined... write your test here');
});

test('should return a Number', () => {
  expect(convert(2, 'BTC', 'BTC', 'Number')).toBeGreaterThan(0);
  //throw new Error('test not yet defined... write your test here');
});

test('should return a Big number', () => {
  expect(convert(2, 'BTC', 'BTC', 'Big') instanceof Big).toBe(true)
  //throw new Error('test not yet defined... write your test here');
});

test('should return a String', () => {
  expect(typeof(convert(2100, 'mBTC', 'BTC', 'String')) == "string").toBe(true);
  //throw new Error('test not yet defined... write your test here');
});

test('should convert an integer', () => {
  expect(Number.isInteger(convert(123456789012345, 'Satoshi', 'BTC', 'Number'))).toBe(false);
  //throw new Error('test not yet defined... write your test here');
});

test('should convert a number', () => {
  expect(Number.isInteger(convert(1234567.89012345, 'BTC', 'Satoshi', 'Number'))).toBe(true);
  //throw new Error('test not yet defined... write your test here');
});

test('should convert a string', () => {
  expect(typeof(convert('2', 'BTC', 'BTC', 'Number')) != "string").toBe(true);
  //throw new Error('test not yet defined... write your test here');
});

test('should convert a Big number', () => {
  expect(convert(new Big(2), 'BTC', 'BTC', 'Number') instanceof Big).toBe(false);
  //throw new Error('test not yet defined... write your test here');
});

test('should convert a NaN to a Number', () => {
  expect(typeof(convert(NaN, 'BTC', 'BTC', 'Number')) == 'number').toBe(true);
  expect(typeof(convert(NaN, 'BTC', 'mBTC', 'Number')) == 'number').toBe(true);
  //throw new Error('test not yet defined... write your test here');
});

test('should convert a NaN to a String', () => {
  expect(typeof(convert(NaN, 'BTC', 'BTC', 'String'))).toBe("string");
  expect(typeof(convert(NaN, 'BTC', 'mBTC', 'String'))).toBe("string");
  //throw new Error('test not yet defined... write your test here');
});

test('should not convert a NaN to a Big', () => {
  expect(() => {
    convert(NaN, 'BTC', 'BTC', 'Big');
  }).toThrow();
  //throw new Error('test not yet defined... write your test here');
});

test('should handle rounding errors', () => {
  expect(convert(4.6, 'Satoshi', 'BTC', 'Number')).not.toBe(convert(0.000000046, 'BTC', 'Satoshi', 'Number'));
  ;
  //throw new Error('test not yet defined... write your test here');
});

test('should throw when untest is undefined', () => {
  expect(() => {
    convert(new Big(2), 'x', 'BTC', 'Number');
  }).toThrow();
  expect(() => {
    convert(new Big(2), 'BTC', 'x', 'Number');
  }).toThrow();
  expect(() => {
    convert(NaN, 'x', 'BTC', 'Number');
  }).toThrow();
  expect(() => {
    convert(NaN, 'BTC', 'x', 'Number');
  }).toThrow();
  //convert(new Big(2), 'x', 'BTC', 'Number');
  //convert(new Big(2), 'BTC', 'x', 'Number');
  //convert(NaN, 'x', 'BTC', 'Number');
  //convert(NaN, 'BTC', 'x', 'Number');
  //throw new Error('test not yet defined... write your test here');
});

test('should throw when representaion is undefined', () => {
  //convert(2, 'BTC', 'mBTC', 'x');
  //convert(NaN, 'BTC', 'mBTC', 'x');
  expect(() => {
    convert(2, 'BTC', 'mBTC', 'x');
  }).toThrow();
  expect(() => {
    convert(NaN, 'BTC', 'mBTC', 'x');
  }).toThrow();
  //throw new Error('test not yet defined... write your test here');
});

test('should allow untest aliases', () => {
  expect(() => {
  expect(convert(4.6, 'Satoshi', 'sat'))
  }).not.toThrow();
  //throw new Error('test not yet defined... write your test here');
});
