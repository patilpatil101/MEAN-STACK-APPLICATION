//==================================================== Server ==============================================================================================================================================------------------------------------------------->
var express        = require('express');
var app            = express();
var mongoose       = require('mongoose'); 
var database       = require('./public/config/database');
var morgan         = require('morgan');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var path           = require('path');
var router         = express.Router();
var session		   = require('express-session');
var http           = require('http');
var fs             = require('fs');
var html 		   = fs.readFileSync('./public/views/route.html');
var nodemailer     = require('nodemailer');


var sess;

app.engine('.html', require('ejs').renderFile);
//***************************************************** Configurations ***************************************************************************************  
mongoose.connect(database.localUrl); 							    // Connect to local MongoDB instance.
app.use(express.static(path.join(__dirname, './public')));
app.use(morgan('dev')); 									   	  // log every request to the console
app.use(bodyParser.urlencoded({'extended': 'true'}));         	 // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); 									// parse application/json
app.use(bodyParser.json({type: 'application/vnd.api+json'}));  // parse application/vnd.api+json as json
app.use(methodOverride('X-HTTP-Method-Override')); 

app.use(session({
	    resave: true,
        saveUninitialized: true,
        secret: 'ssshhhhh',
        cookie: {
            maxAge: 60000
        }
	}));
//***************************************************************************************************************************************************  	

require('./app/routes.js')(app,nodemailer);
  
//***************************************************************************************************************************************************  		
app.listen(3000, function () {
   console.log('Example app listening on port 3000!')
})

//=======================================================================================================================================================------------------------------------------------>