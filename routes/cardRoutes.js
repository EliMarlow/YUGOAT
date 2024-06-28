const express = require('express');
const controller = require('../controllers/cardController');
const {isLoggedIn, isAuthor} = require('../middlewares/auth');
//const {validateId, validatecard} = require('../middlewares/validator');

const router = express.Router();

//GET /cards: send all cards to the user

router.get('/', controller.index);

//GET /cards/new: send html form for creating a new card

//router.get('/new', isLoggedIn, controller.new);

//POST /cards: create a new card
//router.post('/', isLoggedIn, validatecard, controller.create);

//GET /cards/search/ send details of card search
router.get('/:text', controller.index);

//GET /cards/:id: send details of card identified by id
router.get('/showcard/:id', controller.show);

//GET /cards/:id/edit: send html form for editing an exising card
//router.get('/:id/edit', controller.edit);

//PUT /cards/:id: update the card identified by id
//router.put('/:id', validateId, isLoggedIn, isAuthor, validatecard, controller.update);

//DELETE /cards/:id, delete the card identified by id
//router.delete('/:id', validateId, isLoggedIn, isAuthor, controller.delete);

//router.post('/:id/watchings', controller.createWatching);

//router.delete('/:id/watchings', controller.deleteWatching);

//router.post('/:id/offers', controller.createOffer);


module.exports = router;