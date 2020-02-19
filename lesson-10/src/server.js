require('dotenv').config();
require('./core/express-promise');
const express = require('express');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const chalk = require('chalk');
const path = require('path');

// doc
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./services/swagger.json');

// core
const { ValidationError } = require('./core/error');

const { apiPATH, apiVersion, MONGO_URL } = require('./config/config');

const router = require('./routes/routes.js');
const notFound = require('./middleware/not-found');

const isdev = process.env.NODE_ENV !== 'production';

const createServer = (app, PORT) => {
  app
    .disable('x-powered-by')
    .use(express.json({ limit: '16mb' }))
    .use(express.urlencoded({ extended: false, limit: '16mb' }))
    .use(
      session({
        secret: 'super-secret-key',
        store: new MongoStore({ url: MONGO_URL }),
        // resave: false,
        // saveUninitialized: false,
        cookie: { maxAge: 60000 },
      }),
    )

    .use(passport.initialize())
    .use(passport.session());

  require('./services/passport')(passport);

  // if (isdev) {
  const cors = require('cors');
  app.use(cors('*'));
  // }

  app
    .use('/upload', express.static(path.resolve(__dirname, '../upload')))
    .use(apiPATH + apiVersion, router)
    .use(
      '/doc',
      swaggerUi.serve,
      swaggerUi.setup(swaggerDocument, { customeSiteTitle: 'Task Manager' }),
    )
    // add error handlers
    .use((err, req, res, next) => {
      if (err instanceof ValidationError) {
        return res.status(400).json({ status: 'error', message: err.message });
      }
      next(err);
    })
    .all('*', notFound)

    .listen(PORT, () => {
      if (isdev) {
        console.log(
          `Server api on ${chalk.yellow(
            `http://localhost:${PORT}${apiPATH + apiVersion}`,
          )}`,
        );
      }
    });
};

module.exports = createServer;
