const Router = require('koa-router');

const router = new Router();

router.get('meones.list', '/', async (ctx) => {
  try {
    const meones = await ctx.orm.Meones.findAll();
    ctx.body = meones;
    ctx.status = 200;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

router.get('meones.show', '/:id', async (ctx) => {
  try {
    const meones = await ctx.orm.Meones.findOne({ where: { id: ctx.params.id } });
    ctx.body = meones;
    ctx.status = 200;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

module.exports = router;
