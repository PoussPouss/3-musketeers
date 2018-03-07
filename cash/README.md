# cash

## Goal project
This project allows to convert an amount of money between 2 currency.
:warning: This application accepts a limit number of currency. Please look at [currencies accepted](/lib/currencies.json) the list of currencies available.

## Getting started
1. Before launching this application, you need to install package used. You need to move in the folder [cash](/.)
```
npm install
```

2. Now the project can be launch. You need to launch [index.js](bin/index.js) due to this command :
```
node bin/index.js
```
Without argument, the script displays a menu with some helps for using the program, like this :
```
$ cash <amount> <currency>
$ cash <command>
```

N.B. If you indicate only one currency, by default the program will convert the amount in `USD GBP PLN EUR`.
