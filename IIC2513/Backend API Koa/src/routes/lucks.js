const Router = require('koa-router');

const router = new Router();

router.get('lucks.list', '/', async (ctx) => {
  try {
    const lucks = await ctx.orm.Luck.findAll();
    ctx.body = lucks;
    ctx.status = 200;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

router.get('lucks.show', '/:id', async (ctx) => {
  try {
    const lucks = await ctx.orm.Luck.findOne({ where: { id: ctx.params.id } });
    ctx.body = lucks;
    ctx.status = 200;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

module.exports = router;
