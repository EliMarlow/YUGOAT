const model = require('../models/user');
const Card = require('../models/card');
//const Watching = require('../models/watching');

exports.new = (req, res)=>{
        return res.render('./user/new');
};

exports.create = (req, res, next)=>{
 
        let user = new model(req.body);//create a new user
        if(user.email)
        user.email = user.email.toLowerCase();
        user.save()//insert the document to the database
        .then(user=> res.redirect('/users/login'))
        .catch(err=>{
            if(err.name === 'ValidationError' ) {
                req.flash('error', err.message);  
                return res.redirect('/users/new');
            }
    
            if(err.code === 11000) {
                req.flash('error', 'Email has been used');  
                return res.redirect('/users/new');
            }
            
            next(err);
        }); 
};

exports.getUserLogin = (req, res, next) => {
       return res.render('./user/login');
}

exports.login = (req, res, next)=>{
        let email = req.body.email;
        if(email)
        email = email.toLowerCase();
        let password = req.body.password;
        model.findOne({ email: email })
        .then(user => {
            if (!user) {
                console.log('wrong email address');
                req.flash('error', 'wrong email address');  
                res.redirect('/users/login');
                } else {
                user.comparePassword(password)
                .then(result=>{
                    if(result) {
                        req.session.user = user._id;
                        req.flash('success', 'You have successfully logged in');
                        res.redirect('/users/profile');
                } else {
                    req.flash('error', 'wrong password');      
                    res.redirect('/users/login');
                }
                });     
            }     
        })
        .catch(err => next(err));
};

exports.profile = (req, res, next)=>{
    let id = req.session.user;
    Promise.all([model.findById(id)])
    .then(results=>{
        const [user] = results;
        res.render('./user/profile', {user})
    })
    .catch(err=>next(err));
};


exports.logout = (req, res, next)=>{
    req.session.destroy(err=>{
        if(err) 
           return next(err);
       else
            res.redirect('/');  
    });
   
 };


/*exports.card = (req, res, next)=>{
    let id = req.session.user;
    Promise.all([model.findById(id), card.find({author: id})])
    .then(results=>{
        const [user, cards] = results;
        res.render('./card/card', {user, cards})
    })
    .catch(err=>next(err));
}*/