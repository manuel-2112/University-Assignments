const Router = require('koa-router');

const router = new Router();

router.get('communals.list', '/', async (ctx) => {
  try {
    const communals = await ctx.orm.Communal.findAll();
    ctx.body = communals;
    ctx.status = 200;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

router.get('communals.show', '/:id', async (ctx) => {
  try {
    const communals = await ctx.orm.Communal.findOne({ where: { id: ctx.params.id } });
    ctx.body = communals;
    ctx.status = 200;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

module.exports = router;
