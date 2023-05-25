const model = require('../models/trade');
const wmodel = require('../models/watching');
const Offer = require('../models/offer');

exports.index = (req, res, next)=>{
    model.find()
    .then(trades=>res.render('./trade/index', {trades}))
    .catch(err=>next(err));
};

exports.new = (req, res)=>{
    res.render('./trade/new');
};

exports.create = (req, res, next)=>{
    let trade = new model(req.body);//create a new trade document
    trade.author = req.session.user;
    trade.save()//insert the document to the database
    .then(trade=> res.redirect('/trades'))
    .catch(err=>{
        if(err.name === 'ValidationError' ) {
            err.status = 400;
        }
        next(err);
    });
    
};

exports.createWatching = (req, res, next)=>{
    let watching = new wmodel(req.body);
    watching.trade = req.params.id;
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
    offer.itrade = req.params.id;
    offer.initiator = req.session.user;
    offer.save()
    .then(offer=> res.redirect('/users/profile'))
    .catch(err=>{
        if(err.name === 'ValidationError'){
        err.status = 400;
        }
    next(err)
    });
}

exports.show = (req, res, next)=>{
    let id = req.params.id;

    Promise.all([model.findById(id).populate('author', 'firstName lastName')])
    .then(results=>{
        if(results) {
            const[trade] = results;          
            res.render('./trade/show', {trade});
        } else {
            let err = new Error('Cannot find a trade with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err=>next(err));
};

exports.edit = (req, res, next)=>{
    let id = req.params.id;

    model.findById(id)
    .then(trade=>{
        if(trade) {
            return res.render('./trade/edit', {trade});
        } else {
            let err = new Error('Cannot find a trade with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err=>next(err));
};

exports.update = (req, res, next)=>{
    let trade = req.body;
    let id = req.params.id;

    model.findByIdAndUpdate(id, trade, {useFindAndModify: false, runValidators: true})
    .then(trade=>{
        if(trade) {
            res.redirect('/trades/'+id);
        } else {
            let err = new Error('Cannot find a trade with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err=> {
        if(err.name === 'ValidationError')
            err.status = 400;
        next(err);
    });
};

exports.delete = (req, res, next)=>{
    let id = req.params.id;

    model.findByIdAndDelete(id, {useFindAndModify: false})
    .then(trade =>{
        if(trade) {
            res.redirect('/trades');
        } else {
            let err = new Error('Cannot find a trade with id ' + id);
            err.status = 404;
            return next(err);
        }
    })
    .catch(err=>next(err));
};

exports.deleteWatching = (req, res, next)=>{
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
};