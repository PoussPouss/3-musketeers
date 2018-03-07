/*eslint-disable no-process-exit*/
const got = require('got');
const money = require('money');
const chalk = require('chalk');
const ora = require('ora');
const currencies = require('../lib/currencies.json');

const API = 'https://api.fixer.io/latest';




/**
 * This function allows to convert money in terms of the amount, the currency "from"
 * and the currency "to"
 */
const convert = configuration => {
  const {amount, to, from, response, loading} = configuration;

  // After giving all information, the money lib allows to do the convertion
  money.base = response.body.base;
  money.rates = response.body.rates;

  to.forEach(item => {
    // verify the currency it's available in the json
    if (currencies[item]) {
      loading.succeed(
        `${chalk.green(
          money.convert(amount, {from, 'to': item}).toFixed(2)
        )} ${`(${item})`} ${currencies[item]}`
      );
    } else {
      loading.warn(`${chalk.yellow(` The ${item} currency not found `)}`);
    }
  });

  console.log();
  console.log(
    chalk.underline.gray(
      ` Conversion of ${chalk.bold(from)} ${chalk.bold(amount)}`
    )
  );
  process.exit(1);
};




/**
 * This function allows to manage the demand for being convert
 * in using the function convert
 */
const cash = async command => {
  // stores data necessary for the conversion
  const amount = command.amount;
  const from = command.from.toUpperCase();
  const to = command.to
    .filter(item => item !== from) // verify that the currency is different of "from" currency
    .map(item => item.toUpperCase());

  console.log();
  // allows to show a loading animation in using the ora lib
  const loading = ora({
    'text': 'Converting currency...',
    'color': 'green',
    'spinner': {
      'interval': 200,
      'frames': to
    }
  });

  // We start the loading and run until a changement given by the code
  // the changement can be after a success loading or a fail loading
  loading.start();

  try {
    // allows to get the current price
    const response = await got(API, {'json': true});
    convert({amount, to, from, response, loading});
  } catch (err) {
    if (err.code === 'ENOTFOUND') {
      loading.fail(chalk.red('   Please check your internet connection.\n'));
    } else {
      loading.fail(chalk.red('   Internal server error... \n'));
    }
    process.exit(1);
  }
};

module.exports = cash;
