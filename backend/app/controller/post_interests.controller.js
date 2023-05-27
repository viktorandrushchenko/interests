var db = require('../config/db.config.js');
var Post_interests = db.post_interests;
var globalFunctions = require('../config/global.functions.js');

exports.findAll = (req, res) => {
    Post_interests.findAll()
        .then(objects => {
            globalFunctions.sendResult(res, objects);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};

// Добавление абитуриента
exports.create = (req, res) => {
    Post_interests.create({
        post_id: req.body.post_id,
        interest_id: req.body.interest_id
    }).then(object => {
        globalFunctions.sendResult(res, object);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    })
};

// Обновление данных абитуриента по id
exports.update = (req, res) => {
    Post_interests.update({
        post_id: req.body.post_id,
        interest_id: req.body.interest_id
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
    Post_interests.destroy({
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
    Post_interests.findByPk(req.params.id)
        .then(object => {
            globalFunctions.sendResult(res, object);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};

// Получение данных абитуриента по post_id
exports.findByPost_id = (req, res) => {
    Post_interests.findAll({
        where: {
            post_id: req.params.post_id
        }
    }).then(objects => {
        globalFunctions.sendResult(res, objects);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    })
};

// Получение данных абитуриента по interest_id
exports.findByInterest_id = (req, res) => {
    Post_interests.findAll({
        where: {
            interest_id: req.params.interest_id
        }
    }).then(objects => {
        globalFunctions.sendResult(res, objects);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    })
};