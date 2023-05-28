var db = require('../config/db.config.js');
var User_interests = db.user_interests;
var globalFunctions = require('../config/global.functions.js');

exports.findAll = (req, res) => {
    User_interests.findAll()
        .then(objects => {
            globalFunctions.sendResult(res, objects);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};

// Добавление абитуриента
exports.create = (req, res) => {
    User_interests.create({
        user_id: req.body.user_id,
        interest_id: req.body.interest_id,
        admin: req.body.admin
    }).then(object => {
        globalFunctions.sendResult(res, object);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    })
};

// Обновление данных абитуриента по id
exports.update = (req, res) => {
    User_interests.update({
        user_id: req.body.user_id,
        interest_id: req.body.interest_id,
        admin: req.body.admin
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
    User_interests.destroy({
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
    User_interests.findByPk(req.params.id)
        .then(object => {
            globalFunctions.sendResult(res, object);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};

// Получение данных абитуриента по user_id
exports.findByUser_id = (req, res) => {
    User_interests.findAll({
        where: {
            user_id: req.params.user_id
        }
    }).then(objects => {
        globalFunctions.sendResult(res, objects);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    })
};

// Получение данных абитуриента по interest_id
exports.findByInterest_id = (req, res) => {
    User_interests.findAll({
        where: {
            interest_id: req.params.interest_id
        }
    }).then(objects => {
        globalFunctions.sendResult(res, objects);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    })
};

exports.searchUser_interestsByUserIdInterestId= (req, res) => {
    User_interests.findAll({
      where: {
        user_id: req.params.user_id,
        interest_id: req.params.interest_id
      }
    }).then(objects => {
        globalFunctions.sendResult(res, objects);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    })
  };