const Koa = require('koa');
const koaLogger = require('koa-logger');
const { koaBody } = require('koa-body');
const router = require('./routes');
const orm = require('./models');

// Crear instancia de Koa
const app = new Koa();

app.context.orm = orm;

// Development logging
app.use(koaLogger());
app.use(koaBody());

// routes
app.use(router.routes());

app.use((ctx) => {
  ctx.body = 'Index DCCPoly';
});

module.exports = app;
