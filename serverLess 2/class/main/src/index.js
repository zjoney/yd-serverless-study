const { Server } = require('@webserverless/fc-express')
const express = require('express');
const initRouter = require('./router');

const app = express();

initRouter(app);

const server = new Server(app);

// http trigger entry
module.exports.handler = function(req, res, context) {
  server.httpProxy(req, res, context);
};