const dotenv = require(`dotenv`);

// import module `express`
const express = require('express');

// import module `hbs`
const hbs = require('hbs');

// import module `routes` from `./routes/routes.js`
const routes = require('./routes/routes.js');

// import module `database` from `./model/db.js`
const db = require('./models/db.js');

//const bodyParser = require(`body-parser`);

const app = express();

dotenv.config();
port = process.env.PORT;
hostname = process.env.HOSTNAME;

// set `hbs` as view engine
app.set('view engine', 'hbs');

// sets `/views/partials` as folder containing partial hbs files
hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('zerolength', function (v1, v2, options) {
'use strict';
   if (v1.length===v2) {
     return options.fn(this);
  }
  return options.inverse(this);
});

hbs.registerHelper('checklength', function (v1, v2, options) {
'use strict';
   if (v1.length<v2) {
     return options.fn(this);
  }
  return options.inverse(this);
});


//Additional Helpers By Dean
hbs.registerHelper('statusString', function(statusIcon) {
	var value;
	if(statusIcon == "fa fa-tasks"){
		value = 'Ongoing';
	} 
	else if(statusIcon == "fa fa-spinner"){
		value = 'Pending';
	}
	else if(statusIcon == "fa fa-check-square"){
		value = 'Approved';
	}
	else if(statusIcon == "fa fa-times-circle"){
		value = 'Disapproved';
	}
	return value;
});

hbs.registerHelper('counter', function(index) {
	return index + 1;
});

hbs.registerHelper('ifSignedButtonType', function(hasSigned){
	var buttonType;

	if(hasSigned == true){
		buttonType = 'unsign-petition btn-secondary';
	}
	else{
		buttonType = 'sign-petition btn-primary';
	}

	return buttonType;

});

hbs.registerHelper('ifSignedButtonText', function(hasSigned){
	var buttonText;

	if(hasSigned == true){
		buttonText = 'Unsign Petition';
	}
	else{
		buttonText = 'Sign Petition';
	}

	return buttonText;

});

hbs.registerHelper('statusAlertColor', function(status){
	var value;
	if(status == "fa fa-tasks"){
		//value = 'Ongoing';
		value = 'alert-primary';
	} 
	else if(status == "fa fa-spinner"){
		//value = 'Pending';
		value = 'alert-warning';
	}
	else if(status == "fa fa-check-square"){
		//value = 'Approved';
		value= 'alert-success';
	}
	else if(status == "fa fa-times-circle"){
		//value = 'Disapproved';
		value = 'alert-danger';
	}
	return value;
});

hbs.registerHelper('statusAlertText', function(status){
	var value;
	if(status == "fa fa-tasks"){
		//value = 'Ongoing';
		value = 'This petition is still ongoing! Once required number of signatures is reached, it will be pending for approval of the university.';
	} 
	else if(status == "fa fa-spinner"){
		//value = 'Pending';
		value = 'This petition is currently pending approval from the University. Please wait and coordinate with your fellow signees for the meantime.';
	}
	else if(status == "fa fa-check-square"){
		//value = 'Approved';
		value= 'Congratulations! This petition has been approved by the university. Please coordinate with the university and your fellow signees.';
	}
	else if(status == "fa fa-times-circle"){
		//value = 'Disapproved';
		value = 'orry! This petition is disapproved by the university. Please start or sign another petition.';
	}
	return value;
});


// parses incoming requests with urlencoded payloads
app.use(express.urlencoded({extended: true}));

// set the folder `public` as folder containing static assets
// such as css, js, and image files
app.use(express.static('public'));

//app.use(bodyParser.urlencoded({ extended: false}));

// define the paths contained in `./routes/routes.js`
app.use('/', routes);

// if the route is not defined in the server, render `../views/error.hbs`
// always define this as the last middleware
// app.use(function (req, res) {
//     res.render('error');
// });

// connects to the database
db.connect();

// binds the server to a specific port
app.listen(port, function () {
    console.log('app listening at port ' + port);
});
