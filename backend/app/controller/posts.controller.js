var db = require('../config/db.config.js');
var Posts = db.posts;
var globalFunctions = require('../config/global.functions.js');
const Sequelize = require('sequelize');

exports.findAll = (req, res) => {
    Posts.findAll()
        .then(objects => {
            globalFunctions.sendResult(res, objects);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};

// Добавление абитуриента
exports.create = (req, res) => {
    Posts.create({
        user_id: req.body.user_id,
        title: req.body.title,
        body: req.body.body,
        interest_id: req.body.interest_id,
        created_at: Date.now()
    }).then(object => {
        globalFunctions.sendResult(res, object);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    })
};

// Обновление данных абитуриента по id
exports.update = (req, res) => {
    Posts.update({
        user_id: req.body.user_id,
        title: req.body.title,
        body: req.body.body,
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
    Posts.destroy({
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
    Posts.findByPk(req.params.id)
        .then(object => {
            const json = object.toJSON();
            json.created_at = new Date(json.created_at).toLocaleString();
            globalFunctions.sendResult(res, json);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};

// Получение данных абитуриента по id
exports.findByInterests_id = (req, res) => {
    Posts.findAll({
        attributes: [
            'id',
            'user_id',
            'title',
            'body',
            [Sequelize.fn('DATE_FORMAT', Sequelize.col('created_at'), '%Y-%m-%d %H:%i:%s'), 'created_at']
        ],
        where: {
            interest_id: req.params.interest_id
        },
        order: [['created_at', 'DESC']]
    }).then(objects => {
        globalFunctions.sendResult(res, objects);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    })
};

