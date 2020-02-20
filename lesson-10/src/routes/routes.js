const router = require('express').Router();
const authRouter = require('./auth.router');
const userRouter = require('./user.router');
const imagesRouter = require('./images.router');
const storageRouter = require('./storage.router');
router
  .use('/auth', authRouter)
  .use('/user', userRouter)
  .use('/images', imagesRouter)
  .use('/storage', storageRouter);

module.exports = router;
