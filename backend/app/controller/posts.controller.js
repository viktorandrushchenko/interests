var db = require('../config/db.config.js');
var Posts = db.posts;
var globalFunctions = require('../config/global.functions.js');

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
            globalFunctions.sendResult(res, object);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};