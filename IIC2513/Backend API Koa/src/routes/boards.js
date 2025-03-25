const Router = require('koa-router');

const router = new Router();

router.post('boards.create', '/', async (ctx) => {
  try {
    const board = await ctx.orm.Board.create(ctx.request.body);
    ctx.body = board;
    ctx.status = 201;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

router.get('boards.list', '/', async (ctx) => {
  try {
    const board = await ctx.orm.Board.findAll();
    ctx.body = board;
    ctx.status = 200;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

router.get('boards.show', '/:id', async (ctx) => {
  try {
    const board = await ctx.orm.Board.findOne({ where: { id: ctx.params.id } });
    ctx.body = board;
    ctx.status = 200;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

module.exports = router;
