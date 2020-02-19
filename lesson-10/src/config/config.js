/* eslint-disable no-useless-escape */
const mode = process.env.NODE_ENV === 'production';

module.exports = {
  MONGO_URL: process.env.MONGO_DB_URL,
  PORT: process.env.PORT || 5002,
  apiPATH: '/api',
  apiVersion: '/v1',
  SERVER_URL_LOCAL: `http://localhost:${process.env.PORT}`,
  SERVER_URL_PROD: '',
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  GOOGLE_CLIENT_ID: '',
  GOOGLE_CLIENT_SECRET: '',
  GOOGLE_CB_URL: `${
    mode ? this.SERVER_URL_PROD : this.SERVER_URL_LOCAL
  }/auth/google/callback`,
  FACEBOOK_APP_ID: process.env.FACEBOOK_APP_ID,
  FACEBOOK_APP_SECRET: process.env.FACEBOOK_APP_SECRET,
  FACEBOOK_CB_URL: `${
    mode ? this.SERVER_URL_PROD : this.SERVER_URL_LOCAL
  }/auth/facebook/callback`,
  emailRegexp: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  baseUrl:
    process.env.BASE_URL || `http://localhost:${process.env.PORT || 5002}`,
};
