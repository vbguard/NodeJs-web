require('dotenv').config();
const express = require('express');
const chalk = require('chalk');
const config = require('./src/config/config');

const createServer = require('./src/server');
const connectToDB = require('./src/config/mongodb');

const { PORT, MONGO_URL } = config;

const isdev = process.env.NODE_ENV !== 'production';

const app = express();

createServer(app, PORT);
connectToDB(MONGO_URL);
if (isdev) {
  console.log(chalk.blue('############'));
  console.log(chalk.green('Everything is OK'));
  console.log(chalk.blue('############'));
}
