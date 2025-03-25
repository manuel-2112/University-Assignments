const Router = require('koa-router');
const courses = require('./courses');
const users = require('./users');
const players = require('./players');
const games = require('./games');
const boards = require('./boards');
const categories = require('./categories');
const communals = require('./communals');
const lucks = require('./lucks');
const meones = require('./meones');
const odocs = require('./meones');

const router = new Router();

router.use('/courses', courses.routes());
router.use('/users', users.routes());
router.use('/players', players.routes());
router.use('/games', games.routes());
router.use('/boards', boards.routes());
router.use('/categories', categories.routes());
router.use('/communals', communals.routes());
router.use('/lucks', lucks.routes());
router.use('/meones', meones.routes());
router.use('/odocs', odocs.routes());

module.exports = router;
