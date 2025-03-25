const Router = require('koa-router');

const router = new Router();

router.get('odocs.list', '/', async (ctx) => {
  try {
    const odocs = await ctx.orm.Odoc.findAll();
    ctx.body = odocs;
    ctx.status = 200;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

router.get('odocs.show', '/:id', async (ctx) => {
  try {
    const odocs = await ctx.orm.Odoc.findOne({ where: { id: ctx.params.id } });
    ctx.body = odocs;
    ctx.status = 200;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

module.exports = router;
