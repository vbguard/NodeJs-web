const router = require('express').Router();
const authRouter = require('./auth.router');
const userRouter = require('./user.router');
const imagesRouter = require('./images.router');

router
  .use('/auth', authRouter)
  .use('/user', userRouter)
  .use('/images', imagesRouter);

module.exports = router;
