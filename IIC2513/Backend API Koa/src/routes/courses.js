const Router = require('koa-router');

const router = new Router();

router.get('courses.list', '/', async (ctx) => {
  try {
    const courses = await ctx.orm.Course.findAll();
    ctx.body = courses;
    ctx.status = 200;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

router.get('courses.show', '/:id', async (ctx) => {
  try {
    const courses = await ctx.orm.Course.findOne({ where: { id: ctx.params.id } });
    ctx.body = courses;
    ctx.status = 200;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

router.post('courses.buy', '/buy', async (ctx) => {
  try {
    const playerId = ctx.request.body.playerId;
    const courseId = ctx.request.body.courseId;

    const player = await ctx.orm.Player.findByPk(playerId);
    const courseToBuy = await ctx.orm.Course.findByPk(courseId);

    if (!player) {
      throw new Error('El jugador no existe');
    }

    if (!courseToBuy) {
      throw new Error('El curso no existe');
    }

    if (courseToBuy.playerId) {
      throw new Error('No puedes comprar un ramo que ya tiene dueño');
    }

    if (player.credits < courseToBuy.cost) {
      throw new Error('No tienes suficientes créditos para comprar el ramo');
    }

    player.credits -= courseToBuy.cost;
    await player.save();

    courseToBuy.playerId = player.id;
    await courseToBuy.save();

    ctx.body = courseToBuy;
    ctx.status = 200;
  } catch (error) {
    ctx.body = { error: error.message };
    ctx.status = 400;
  }
});

router.post('courses.rent', '/rent', async (ctx) => {
  try {
    const chargedPlayer = await ctx.orm.Player.findOne({ where: { id: ctx.request.body.playerId } });
    const course = await ctx.orm.Course.findOne({ where: { position: chargedPlayer.position, boardId: chargedPlayer.gameId } });
    let charged = false;

    if (!course) {
      throw new Error('El jugador no esta posicionado en ningun curso.');
    }

    if (course.playerId != null) {
      const chargerPlayer = await ctx.orm.Player.findOne({
        where: {
          id: course.playerId,
          gameId: chargedPlayer.gameId,
        },
      });

      chargedPlayer.credits -= course.rent;
      await chargedPlayer.save();

      chargerPlayer.credits += course.rent;
      await chargerPlayer.save();
      charged = true;
    }

    ctx.body = { charged, course };
    ctx.status = 200;
  } catch (error) {
    ctx.body = { error: error.message };
    ctx.status = 400;
  }
});

module.exports = router;
