const express = require('express');
const controller = require('../controllers/deckController');
const {isLoggedIn, isAuthor} = require('../middlewares/auth');

const router = express.Router();

router.get('/', controller.index);

//GET /decks/new: send html form for creating a new card
router.get('/new', isLoggedIn, controller.new);

router.post('/new', isLoggedIn, controller.cardinfo);

module.exports = router;