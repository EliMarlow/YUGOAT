const model = require('../models/deck');
const cardmodel = require('../models/card');

exports.index = (req, res, next)=>{
    model.find()
        .then(decks=>res.render('./deck/index', {decks}))
        .catch(err=>next(err));
    };

exports.new = (req, res, next)=>{
    selectCard = null;
    deckList = new Array();
    cardmodel.find()
    .then(cards=>res.render('./deck/new', {cards, selectCard, deckList}))
    .catch(err=>next(err));
};

exports.cardinfo = (req, res, next)=>{
    let cid = req.body.cardId;
    console.log(cid)
    cardmodel.findById(cid)
    .then(result=>{
        if(result) {
            let cardDetails =  '<div class="cardDisplay2">\
                                <img src='+ result.card_images[0].image_url + '>\
                                <div class="cardInfo">\
                                <h2>'+ result.name + '</h2>\
                                <h4>'+ result.race+'/'+result.frameType+'</h4>\
                                <p>'+ result.desc+'</p>'
                                

            res.send({html: cardDetails});
        } else {
            let err = new Error('Cannot find a card with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err=>next(err));
};
/*<div class="cardDisplay">
   <img class="cardLarge" src=<%= card.card_images[0].image_url%>>
   <div class="cardInfo">
   <h2><%= card.name%></h2>
   <h4>[<%= card.race%>/<%= card.frameType%>]</h4>
   <p><%= card.desc%></p>
   <p>ATK: <%= card.atk%> DEF: <%= card.def%></p>
   </div>
</div>*/