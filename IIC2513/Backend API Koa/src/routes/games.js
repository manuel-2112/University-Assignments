const Router = require('koa-router');
const fs = require('fs');
const path = require('path');

const router = new Router();

router.post('games.create', '/create', async (ctx) => {
  try {
    const player = await ctx.orm.Player.findOne({ where: { id: ctx.request.body.playerId } });
    const newGame = {
      turn: 0,
      winner: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const game = await ctx.orm.Game.create(newGame);

    const newBord = {
      playerId: player.id,
      gameId: game.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const board = await ctx.orm.Board.create(newBord);

    const filePath = path.join(__dirname, '../data/courses.json');
    const jsonData = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(jsonData);

    let coursesData = data.courses;

    coursesData = coursesData.map((course) => {
      course.boardId = board.id;
      course.playerId = null;
      course.createdAt = new Date();
      course.updatedAt = new Date();
      return course;
    });
    const courses = await ctx.orm.Course.bulkCreate(coursesData);

    const filePathCards = path.join(__dirname, '../data/cards.json');
    const jsonDataCards = fs.readFileSync(filePathCards, 'utf-8');
    const dataCards = JSON.parse(jsonDataCards);

    let odocData = dataCards.odoc;
    odocData = odocData.map((odoc) => {
      odoc.boardId = board.id;
      odoc.createdAt = new Date();
      odoc.updatedAt = new Date();
      return odoc;
    });
    const odocs = await ctx.orm.Odoc.bulkCreate(odocData);

    let luckData = dataCards.luck;
    luckData = luckData.map((luck) => {
      luck.boardId = board.id;
      luck.createdAt = new Date();
      luck.updatedAt = new Date();
      return luck;
    });
    const lucks = await ctx.orm.Luck.bulkCreate(luckData);

    let communalData = dataCards.communal;
    communalData = communalData.map((communal) => {
      communal.boardId = board.id;
      communal.createdAt = new Date();
      communal.updatedAt = new Date();
      return communal;
    });
    const communals = await ctx.orm.Communal.bulkCreate(communalData);

    let meonesData = dataCards.meones;
    meonesData = meonesData.map((meones) => {
      meones.boardId = board.id;
      meones.createdAt = new Date();
      meones.updatedAt = new Date();
      return meones;
    });
    const meones = await ctx.orm.Meones.bulkCreate(meonesData);

    player.gameId = game.id;
    await player.save();

    ctx.body = {
      game, board, courses, odocs, lucks, communals, meones,
    };
    ctx.status = 201;
  } catch (error) {
    ctx.body = error;
    console.log(error);
    ctx.status = 400;
  }
});

router.post('games.join', '/join', async (ctx) => {
  try {
    const player = await ctx.orm.Player.findOne({ where: { id: ctx.request.body.playerId } });
    const game = await ctx.orm.Game.findOne({ where: { id: ctx.request.body.gameId } });
    const players = await ctx.orm.Player.findAll({ where: { gameId: ctx.request.body.gameId } });

    if (player.boardId) {
      throw new Error('No puedes unirte a otro juego');
    }

    if (players.length === 4) {
      throw new Error('El juego ya está lleno');
    }
    player.gameId = game.id;
    await player.save();

    ctx.body = {
      game, board, courses, odocs, lucks, communals, meones,
    };
    ctx.status = 201;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

router.get('games.list', '/', async (ctx) => {
  try {
    const games = await ctx.orm.Game.findAll();
    ctx.body = games;
    ctx.status = 200;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

router.get('games.show', '/status/:id', async (ctx) => {
  try {
    const game = await ctx.orm.Game.findOne({ where: { id: ctx.params.id } });
    const players = await ctx.orm.Player.findAll({ where: { gameId: ctx.params.id } });
    ctx.body = { game, players };
    ctx.status = 200;
  } catch (error) {
    ctx.body = error;
    console.log(error);
    ctx.status = 400;
  }
});

module.exports = router;
