var db = require('../config/db.config.js');
var Interest = db.interest;
var User_interests = db.user_interests;
var globalFunctions = require('../config/global.functions.js');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

exports.findAll = (req, res) => {
    Interest.findAll()
        .then(objects => {
            globalFunctions.sendResult(res, objects);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};

// Добавление абитуриента
exports.create = (req, res) => {
    var a;
    Interest.create({       
        name: req.body.name,
    }).then(object => {
        a = object.id;
        User_interests.create({
            interest_id: a,
            user_id: req.body.user_id,
            admin: "1"
        }).then(object => {
            globalFunctions.sendResult(res, object);
        }).catch(err => {
            globalFunctions.sendError(res, err);
        })
    }).catch(err => {
        globalFunctions.sendError(res, err);
    })
    
};

// Обновление данных абитуриента по id
exports.update = (req, res) => {
    Interest.update({
            name: req.body.name
        },
        {
            where: {
                id: req.params.id
            }
        }
    ).then(object => {
        globalFunctions.sendResult(res, object);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    })
};

// Удаление абитуриента по id
exports.delete = (req, res) => {
    Interest.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => {
        globalFunctions.sendResult(res, 'Запись удалена');
    }).catch(err => {
        globalFunctions.sendError(res, err);
    });
};

// Получение данных абитуриента по id
exports.findById = (req, res) => {
    Interest.findByPk(req.params.id)
        .then(object => {
            globalFunctions.sendResult(res, object);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};

// Получение данных абитуриента по фамилии  
exports.findByName = (req, res) => {
    Interest.findAll({
        where: {
            name: {
                [Op.like]: req.params.name + '%'
            }
        }
    }).then(objects => {
        globalFunctions.sendResult(res, objects);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    })
};