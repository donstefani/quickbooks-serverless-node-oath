'use strict';

const authRouter = require('express').Router();
const authController = require('../controllers/authController');

const routes = (jwt) => {
  const controller = authController(jwt);
  authRouter.get('/auth', controller.get);
  return authRouter;
};

module.exports = routes;
