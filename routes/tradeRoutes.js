const express = require('express');
const controller = require('../controllers/tradeController');
const {isLoggedIn, isAuthor} = require('../middlewares/auth');
const {validateId, validateTrade} = require('../middlewares/validator');

const router = express.Router();

//GET /trades: send all trades to the user

router.get('/', controller.index);

//GET /trades/new: send html form for creating a new trade

router.get('/new', isLoggedIn, controller.new);

//POST /trades: create a new trade

router.post('/', isLoggedIn, validateTrade, controller.create);

//GET /trades/:id: send details of trade identified by id
router.get('/:id', validateId, controller.show);

//GET /trades/:id/edit: send html form for editing an exising trade
router.get('/:id/edit', validateId, isLoggedIn, isAuthor, controller.edit);

//PUT /trades/:id: update the trade identified by id
router.put('/:id', validateId, isLoggedIn, isAuthor, validateTrade, controller.update);

//DELETE /trades/:id, delete the trade identified by id
router.delete('/:id', validateId, isLoggedIn, isAuthor, controller.delete);

router.post('/:id/watchings', controller.createWatching);

router.delete('/:id/watchings', controller.deleteWatching);

router.post('/:id/offers', controller.createOffer);


module.exports = router;