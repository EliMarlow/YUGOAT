const model = require('../models/card');
//const wmodel = require('../models/watching');
exports.index = (req, res, next)=>{
    //console.log("index loaded")
    let search = req.query.searchbar;
    console.log(search);
    if (search){
        model.find({ $or: [ { name: { $regex: search } }, { desc: { $regex: search } } ] })
        .then(cards=>{
            if(cards){
                res.render('./card/index', {cards});
            } else {
                let err = new Error('Cannot find cards with name ' + search);
                err.status = 404;
                next(err);
            }
        });
    } else {
        model.find()
        .then(cards=>res.render('./card/index', {cards}))
        .catch(err=>next(err));
    }
};

/*exports.new = (req, res)=>{
    res.render('./card/new');
};

exports.create = (req, res, next)=>{
    let card = new model(req.body);//create a new card document
    card.author = req.session.user;
    card.save()//insert the document to the database
    .then(card=> res.redirect('/cards'))
    .catch(err=>{
        if(err.name === 'ValidationError' ) {
            err.status = 400;
        }
        next(err);
    });
    
};

exports.createWatching = (req, res, next)=>{
    let watching = new wmodel(req.body);
    watching.card = req.params.id;
    watching.author = req.session.user;
    watching.save()
    .then(watch=> res.redirect('/users/profile'))
    .catch(err=>{
        if(err.name === 'ValidationError'){
        err.status = 400;
        }
    next(err)
    });
}

exports.createOffer = (req, res, next)=>{
    let offer = new Offer(req.body);
    console.log(offer)
    offer.icard = req.params.id;
    offer.initiator = req.session.user;
    offer.save()
    .then(offer=> res.redirect('/users/profile'))
    .catch(err=>{
        if(err.name === 'ValidationError'){
        err.status = 400;
        }
    next(err)
    });
}*/

exports.show = (req, res, next)=>{
    let id = req.params.id;

    Promise.all([model.findById(id)])
    .then(results=>{
        if(results) {
            const[card] = results;          
            res.render('./card/show', {card});
        } else {
            let err = new Error('Cannot find a card with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err=>next(err));
};



/*exports.edit = (req, res, next)=>{
    let id = req.params.id;

    model.findById(id)
    .then(card=>{
        if(card) {
            return res.render('./card/edit', {card});
        } else {
            let err = new Error('Cannot find a card with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err=>next(err));
};*/


/*exports.deleteWatching = (req, res, next)=>{
    let id = req.params.id;

    wmodel.findByIdAndDelete(id, {useFindAndModify: false})
    .then(watching =>{
        if(watching) {
            res.redirect('users/profile');
        } else {
            let err = new Error('Cannot find a watching with id ' + id);
            err.status = 404;
            return next(err);
        }
    })
    .catch(err=>next(err));
};*/