var db = require('../config/db.config.js');
var Users = db.users;
// регистрация пользователя с предварительной проверкой существования логина
exports.checkDuplicateUsername = (req, res, next) => {
    Users.findOne({
        where: {
            username: req.body.username
        }
    }).then(users => {
        if (users) {
            res.status(400).send({
                message: "Пользователь с данным логином существует"
            });
            return;
        }
        // если пользователя с переданным логином не существует, то переходим к следующему этапу регистрации
        next();
    });
};