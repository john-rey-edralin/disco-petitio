
// import module `database` from `../models/db.js`
const db = require('../models/db.js');

// import module `User` from `../models/UserModel.js`
const Petition = require('../models/PetitionModel.js');

const User = require('../models/UserModel.js');

/*
    defines an object which contains functions executed as callback
    when a client requests for `Register` paths in the server
*/

const signpetitionController = {

    getSignpetition: function (req, res) {
        if(req.session.username) {

            var username = req.session.username;
            //res.render(`edit-prof`,username);
            //var username = req.query.param;
            //res.send(username);
            //res.render(`edit-prof`);
            var curUser = req.session.username;
            db.findOne(User, {username: username}, null, function (result) {
                //res.render(`my-petition`,result);
                db.findMany(Petition, null, null, function (all) {
                    // res.send(result);
                    console.log("curUser: " + curUser);
                    res.render(`sign-petition`,{all,result, curUser});
                    //res.send(all);
                    // res.render(`my-petition`, { 
                    //     friends:[ 
                    //         {fn: `“Ned”`, ln: `“Stark”`}, 
                    //         {fn: `“Cat”`, ln: `“Tully”`}
                    //     ]
                    // });
                });
            });
        }
        else {
            res.redirect('/login');
        }
            
    },

    getSearchtypepetition: function (req, res) {
        // res.send(`test`);
        if(req.session.username) {

            var username = req.session.username;
            var tempsearch = req.query.search;
            var search = tempsearch.toUpperCase();
            //res.send(`test ` + search + ` ` + username);
            db.findOne(User, {username: username}, null, function (result) {
                db.findMany(Petition, {coursetype: search}, null, function (all) {
                    res.render(`sign-petition`,{all,result,search});
                });
            });
        }
        else {
            res.redirect('/login');
        }
            
    },

    getSearchpetition: function (req, res) {
        // res.send(`test`);

        if(req.session.username) {

            var username = req.session.username;
            var tempsearch = req.query.search;
            var search = tempsearch.toUpperCase();
            //res.send(`test ` + search + ` ` + username);
            db.findOne(User, {username: username}, null, function (result) {
                db.findMany(Petition, {coursecode: { "$regex" : search }}, null, function (all) {
                    res.render(`sign-petition`,{all,result,search});
                });
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
module.exports = signpetitionController;
