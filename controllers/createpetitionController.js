
// import module `database` from `../models/db.js`
const db = require('../models/db.js');

// import module `User` from `../models/UserModel.js`
const Petition = require('../models/PetitionModel.js');

const User = require('../models/UserModel.js');

/*
    defines an object which contains functions executed as callback
    when a client requests for `Register` paths in the server
*/


const createpetitionController = {

    getCreatepetition: function (req, res) {
        var username = req.params.username;
        //res.render(`edit-prof`,username);
        //var username = req.query.param;
        //res.send(username);
        //res.render(`edit-prof`);
        db.findOne(User, {username: username}, null, function (result) {
            res.render(`create-petition`,result);
        });
    },

    postCreatepetition: function (req, res) {
        var tempday = [req.body.monday,req.body.tuesday,req.body.wednesday,
                       req.body.thursday,req.body.friday,req.body.saturday];
        var day = [];
        for(var i=0; i<6; i++) {
            if(tempday[i] != null) {
                day.push(tempday[i]);
            }
        }

        var username= req.params.username;
        var coursecode= req.body.coursecode.toUpperCase();
        var coursetype= coursecode.substring(0, 2).toUpperCase();
        var day1= day[0];
        var day2= day[1];
        var starttime= req.body.starttime;
        var endtime= req.body.endtime;
        var numstudents= req.body.numstudents;
        var signed= `1`;
        var tempprogress= parseInt(signed) / parseInt(numstudents) * 100;
        var progress= tempprogress.toString();
        var statusicon= `fa fa-tasks`;

        var temppetitionid;
        db.findMany(Petition, null, null, function (all) {
            temppetitionid= all.length;
            var petitionid= temppetitionid.toString();
            //res.send(progress);
            var petition = {
                username: username,
                coursecode: coursecode,
                coursetype: coursetype,
                day1: day1,
                day2: day2,
                starttime: starttime,
                endtime: endtime,
                numstudents: numstudents,
                signed: signed,
                progress: progress,
                statusicon: statusicon,
                petitionid: petitionid
            }

            //res.send(petition);

            db.insertOne(Petition, petition, function(flag) {
                if(flag) {
                    res.redirect(/home/+petition.username);
                }
            });
        });
    }
}

/*
    exports the object `controller` (defined above)
    when another script exports from this file
*/
module.exports = createpetitionController;
