'use strict';

const AWS = require('aws-sdk');
const serverless = require('serverless-http');
const express = require('express');
const basicAuth = require('express-basic-auth');
const cors = require('cors');
const bodyParser = require('body-parser');
const expJwt = require('express-jwt');
const jwt = require('jsonwebtoken');

const app = express();

AWS.config.update({ region: process.env.REGION });

AWS.config.logger = console;

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(expJwt({ secret: process.env.JWT_KEY, algorithms: ['RS256'] }).unless({ path: ['/auth'] }));

app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(err.status).send({ message: err.message });
    return;
  }
  next();
});

// routes
const authRouter = require('./routes/auth')(jwt);

// index
app.get('/', (req, res) => {
  res.status(400).json({
    error: true,
    message: 'URL must contain parameters',
  });
});

// auth - jwt
app.use(
  '/',
  basicAuth({
    users: { basicauth: process.env.BASIC_AUTH_PASS },
  }),
  authRouter
);

module.exports.handler = serverless(app);
