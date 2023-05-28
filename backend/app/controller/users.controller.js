var db = require('../config/db.config.js');
var Users = db.users;
var globalFunctions = require('../config/global.functions.js');

exports.findAll = (req, res) => {
    Users.findAll()
        .then(objects => {
            globalFunctions.sendResult(res, objects);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};
