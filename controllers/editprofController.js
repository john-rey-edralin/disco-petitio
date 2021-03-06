
// import module `database` from `../models/db.js`
const db = require('../models/db.js');

// import module `User` from `../models/UserModel.js`
const User = require('../models/UserModel.js');

// import module `bcrypt` for password hashing
const bcrypt = require('bcrypt');
const saltRounds = 10;

const { validationResult }  = require('express-validator');
/*
    defines an object which contains functions executed as callback
    when a client requests for `Register` paths in the server
*/

const editprofController = {

    getEditprof: function (req, res) {
        if(req.session.username) {

            // var username = `123`;
            var username = req.session.username;
            //res.render(`edit-prof`,username);
            //var username = req.query.param;
            //res.send(username);
            //res.render(`edit-prof`);
            db.findOne(User, {username: username}, null, function (result) {
                res.render(`edit-prof`,{result});
            });
            //res.end();
            // render `../views/index.hbs`
            //res.render(`edit-prof`);
        }
        else {
            res.redirect('/login');
        }
        
            
    },

    postEditpic: function (req, res) {
        if(req.session.username) {

            var username = req.session.username;

            var completepath = req.file.path;
            var picname = completepath.substr(14);
            // //console.log(JSON.stringify(req.file.path))
            // //res.redirect('/editprof/'+username);
            // // alert(JSON.stringify(picname));
            console.log(completepath)
            console.log(picname)
              
            db.findOne(User, {username: username}, null, function (filter) {
                db.updateOne(User, filter, {picname: picname}, function (data) { 
                    res.redirect('/editprof/'+username);
                });
            });
        }
        else {
            res.redirect('/login');
        }

            
    },

    postEditprof: function (req, res) {
        if(req.session.username) {

            var errors = validationResult(req);
            var details = {};
            console.log(`TEST`);
            if (!errors.isEmpty()) {

                errors = errors.errors;

                for(i = 0; i < errors.length; i++)
                    details[errors[i].param + 'Error'] = errors[i].msg;

                console.log(details);

                var username = req.session.username;

                console.log(username);
                db.findOne(User, {username: username}, null, function (result) {
                    res.render(`edit-prof`,{result,details});
                });
            }else {

                var username = req.session.username;
                db.findOne(User, {username: username}, null, function (filter) {

                    //hashes the password first before updating 
                    bcrypt.hash(req.body.pass, saltRounds, function(err,hash){

                        var user = {
                            first: req.body.first,
                            last: req.body.last,
                            idnum: req.body.idnum,
                            email: req.body.email,
                            pass: hash
                        }
                        db.updateOne(User, filter, user, function (data) { 
                            res.redirect('/home/'+username);
                        });
                    });
                });
            }
        }
        else {
            res.redirect('/login');
        }
             
    },

    getCheckEmail: function (req, res) {

        if(req.session.username) {

            var email = req.query.email;

            db.findOne(User, {email: email}, null, function (result) {
                res.send(result);
            });
        }
        else {
            res.redirect('/login');
        }
    },

    getCheckID: function (req, res) {

        if(req.session.username) {

            var idnum = req.query.idnum;

            db.findOne(User, {idnum: idnum}, null, function (result) {
                res.send(result);
            });
        }
        else {
            res.redirect('/login');
        }
  
    },

    getUserInfo: function (req, res) {

        if(req.session.username) {

            var username = req.query.username;

            db.findOne(User, {username: username}, null, function (result) {
                res.send(result);
            });
        }
        else {
            res.redirect('/login');
        }

    },

    getDeleteUser: function (req, res) {

        if(req.session.username) {

            var username = req.query.username;

            db.deleteOne(User, {username: username}, function (result) {
                res.send(result); 
            });
        }
        else {
            res.redirect('/login');
        }
    }
}

/*
    exports the object `controller` (defined above)
    when another script exports from this file
*/
module.exports = editprofController;
