const router = require('express').Router();
const usersRouter = require('./users');
const cardsRouter = require('./cards');
const auth = require('../middlewares/auth');
const signupRouter = require('./signup');
const signinRouter = require('./singnin');
const NotFoundError = require('../errors/NotFoundError');

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
router.use('/signup', signupRouter);
router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
router.use('/signin', signinRouter);
// router.use(auth);
router.use('/users', auth, usersRouter);
router.use('/cards', auth, cardsRouter);
router.use('*', (req, res, next) => {
  next(new NotFoundError('страница не найдена.'));
});

module.exports = router;
