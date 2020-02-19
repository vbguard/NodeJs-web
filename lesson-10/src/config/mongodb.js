const mongoose = require('mongoose');
const chalk = require('chalk');

const connectDB = dbUrl => {
  return mongoose
    .connect(dbUrl, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log(chalk.yellow('MongoDB Connected...'));
    })
    .catch(err => {
      console.error(err.message);
      process.exit(1);
    });
};

module.exports = connectDB;
