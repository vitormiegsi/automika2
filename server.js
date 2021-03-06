
const port = 8080;
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();
const validator = require('express-validator');
const engines = require('consolidate');



var schedule = require('node-schedule');
var nodemailer = require('nodemailer');







//new
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const userModel = require('./models/user.model');






//This function will allow us to retrict the access to the routes
global.secure = function (type) {
	return function (request, response, next) {
		if (request.isAuthenticated()) {
			if (type) {
				if (type === request.user.type) {
					return next();
				} else {
					response.redirect('/');
				}
			} else {
				return next();
			}
		}
		response.redirect('/');
	}
};
//end of 

app.use(validator());
app.use(bodyParser.json(), bodyParser.urlencoded({
	extended: true
}));

//new
app.use(cookieParser());
app.use(session({
	secret: 'someRandomSecretKey',
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (username, callback) {
	callback(null, username);
});

passport.deserializeUser(function (username, callback) {
	userModel.read(username, function (data) {
		callback(null, data);
	})
});
//end of new

app.set('view engine', 'ejs');
app.set('views', 'views');

global.connection = mysql.createConnection({
	host: 'd4w.pt',
	user: 'dwpt',
	password: 'Rumoao9.5',
	database: 'dwpt_automika'
}).on('enqueue', function (sequence) {
	if ('Query' === sequence.constructor.name) {
		console.log(sequence.sql);
	}
});

app.listen(port, function () {




	console.log('Server started at: ' + port);

});

//Midleware that sets the isAuthenticated variable in all views

app.use(function(request, response, next){
	response.locals.user = request.user;
	response.locals.isAuthenticated = request.isAuthenticated();
	next();
});


app.use('/main', require('./controllers/main.route'));
app.use('/main_veiculos', require('./controllers/main_veiculos.route'));


app.use('/', require('./controllers/login.route'));
app.use('/public', express.static('public'));
app.use('/index', require('./controllers/index.route'));
app.use('/clientes', require('./controllers/clientes.route'));
app.use('/veiculos', require('./controllers/veiculos.route'));
app.use('/logout',  require('./controllers/logout.route'));
app.use('/users', require('./controllers/user.route'));
app.use('/vendas', require('./controllers/vendas.route'));
//new
