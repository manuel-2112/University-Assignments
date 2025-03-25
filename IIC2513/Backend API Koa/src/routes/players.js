const Router = require('koa-router');

const router = new Router();

router.post('players.create', '/', async (ctx) => {
  try {
    const newPlayer = {
      gameId: null,
      position: 0,
      categoryId: 1,
      credits: 15,
      createdAt: new Date(),
      updatedAt: new Date(),
      ...ctx.request.body,
    };
    const players = await ctx.orm.Player.create(newPlayer);
    ctx.body = players;
    ctx.status = 201;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

router.post('players.move', '/dado', async (ctx) => {
  try {
    const player = await ctx.orm.Player.findOne({ where: { id: ctx.request.body.playerId } });
    const dado = Math.floor(Math.random() * 6) + 1;

    player.position = (player.position + dado) % 20;
    await player.save();

    ctx.body = player;
    ctx.status = 201;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

router.get('players.list', '/', async (ctx) => {
  try {
    const players = await ctx.orm.Player.findAll();
    ctx.body = players;
    ctx.status = 200;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

router.get('players.show', '/:id', async (ctx) => {
  try {
    const player = await ctx.orm.Player.findOne({ where: { id: ctx.params.id } });
    const courses = await ctx.orm.Course.findAll({ where: { playerId: ctx.params.id } });
    ctx.body = { player, courses };
    ctx.status = 200;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

module.exports = router;
