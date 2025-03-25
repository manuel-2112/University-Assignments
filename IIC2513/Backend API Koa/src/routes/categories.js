const Router = require('koa-router');

const router = new Router();

router.get('categories.list', '/', async (ctx) => {
  try {
    const categories = await ctx.orm.Category.findAll();
    ctx.body = categories;
    ctx.status = 200;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

router.get('categories.show', '/:id', async (ctx) => {
  try {
    const categories = await ctx.orm.Category.findOne({ where: { id: ctx.params.id } });
    ctx.body = categories;
    ctx.status = 200;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

router.post('categories.upgrade', '/upgrade', async (ctx) => {
  try {
    const categorie = await ctx.orm.Course.findOne({ where: { id: ctx.request.body.categorieId } });
    const player = await ctx.orm.Player.findOne({ where: { id: ctx.request.body.playerId } });

    if (!categorie) {
      throw new Error('La categoría no existe');
    }
    if (!player) {
      throw new Error('El jugador no existe');
    }

    if (player.credits >= categorie.cost) {
      player.credits -= categorie.cost;
      player.categorieId = categorie.id;
      await player.save();
    } else {
      throw new Error('No tienes los créditos sufiencientes');
    }

    ctx.body = categorie;
    ctx.status = 200;
  } catch (error) {
    ctx.body = { error: error.message };
    ctx.status = 400;
  }
});

module.exports = router;
