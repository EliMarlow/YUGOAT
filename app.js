//require module
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const bodyParser = require('body-parser');
const cardRoutes = require('./routes/cardRoutes');
const deckRoutes = require('./routes/deckRoutes');
const userRoutes = require('./routes/userRoutes');
const uri = 'mongodb+srv://elimarlow16:yugiohdb@cluster0.rgaijkw.mongodb.net/yugiohtrader';

//create app
const app = express();
//configure app
let port = 3000;
app.set('view engine', 'ejs');


async function connect() {
try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");
} catch (error) {
    console.error(error);
}
}

connect();
//http://127.0.0.1:3000/ 
app.listen(port, () => {
    console.log("Server started on port " + port);
})
//mount middlware
app.use(
    session({
        secret: "ajfeirf90aeu9eroejfoefj",
        resave: false,
        saveUninitialized: false,
        store: new MongoStore({mongoUrl: uri}),
        cookie: {maxAge: 60*60*1000}
        })
);
app.use(flash());

app.use((req, res, next) => {
    //console.log(req.session);
    res.locals.user = req.session.user||null;
    res.locals.errorMessages = req.flash('error');
    res.locals.successMessages = req.flash('success');
    next();
});

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(morgan('tiny'));
app.use(methodOverride('_method'));
app.use(bodyParser.json());
//set up routes
app.get('/', (req, res)=>{
    res.render('index');
});

app.get('/about', (req, res)=>{
    res.render('about');
});

app.get('/contact', (req, res)=>{
    res.render('contact');
});
app.use('/cards', cardRoutes);
app.use('/decks', deckRoutes);
app.use('/users', userRoutes);

app.use((req, res, next) => {
    let err = new Error('The server cannot locate ' + req.url);
    err.status = 404;
    next(err);

});

app.use((err, req, res, next)=>{
    console.log(err.stack);
    if(!err.status) {
        err.status = 500;
        err.message = ("Internal Server Error");
    }

    res.status(err.status);
    res.render('error', {error: err});
});
