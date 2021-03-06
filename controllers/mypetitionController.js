
// import module `database` from `../models/db.js`
const db = require('../models/db.js');

// import module `User` from `../models/UserModel.js`
const Petition = require('../models/PetitionModel.js');

const User = require('../models/UserModel.js');

/*
    defines an object which contains functions executed as callback
    when a client requests for `Register` paths in the server
*/


const mypetitionController = {

    getMypetition: function (req, res) {
        if(req.session.username) {

            var username = req.session.username;
            //res.render(`edit-prof`,username);
            //var username = req.query.param;
            //res.send(username);
            //res.render(`edit-prof`);
            db.findOne(User, {username: username}, null, function (result) {
                //res.render(`my-petition`,result);
                db.findMany(Petition, {username: username}, null, function (all) {
                    // res.send(result);
                    res.render(`my-petition`,{all,result});
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

        if(req.session.username) {

            // res.send(`test`);
            var username = req.session.username;
            var tempsearch = req.query.search;
            var search = tempsearch.toUpperCase();
            //res.send(`test ` + search + ` ` + username);
            db.findOne(User, {username: username}, null, function (result) {
                db.findMany(Petition, {coursetype: search, username: username}, null, function (all) {
                    res.render(`my-petition`,{all,result,search});
                });
            });
        }
        else {
            res.redirect('/login');
        }
            
    },

    getSearchpetition: function (req, res) {

        if(req.session.username) {
            
            // res.send(`test`);
            var username = req.session.username;
            var tempsearch = req.query.search;
            var search = tempsearch.toUpperCase();
            //res.send(`test ` + search + ` ` + username);
            db.findOne(User, {username: username}, null, function (result) {
                db.findMany(Petition, {coursecode: { "$regex" : search }, username: username}, null, function (all) {
                    res.render(`my-petition`,{all,result,search});
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
module.exports = mypetitionController;
