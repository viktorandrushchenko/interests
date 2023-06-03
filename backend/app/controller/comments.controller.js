var db = require('../config/db.config.js');
var Comments = db.comments;
var globalFunctions = require('../config/global.functions.js');

exports.findAll = (req, res) => {
    Comments.findAll()
        .then(objects => {
            globalFunctions.sendResult(res, objects);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};

// Добавление абитуриента
exports.create = (req, res) => {
    Comments.create({
        user_id: req.body.user_id,
        body: req.body.body,
        post_id: req.body.post_id,
        created_at: Date.now()
    }).then(object => {
        globalFunctions.sendResult(res, object);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    })
};

// Обновление данных абитуриента по id
exports.update = (req, res) => {
    Comments.update({
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
    Comments.destroy({
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
    Comments.findByPk(req.params.id)
        .then(object => {
            globalFunctions.sendResult(res, object);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};

// Получение данных абитуриента по id
exports.findByPost_id = (req, res) => {
    Comments.findAll({
        where: {
            post_id: req.params.post_id
        },
        order: [['created_at', 'DESC']]
    }).then(objects => {
        globalFunctions.sendResult(res, objects);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    })
};

exports.findByUser_id = (req, res) => {
    Comments.findAll({
        where: {
            user_id: req.params.user_id
        },
        order: [['created_at', 'DESC']]
    }).then(objects => {
        globalFunctions.sendResult(res, objects);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    })
};