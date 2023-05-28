module.exports = (app) => {

    const users = require('../controller/users.controller');
    
    // Получение всех пользователей
    app.get('/api/users', users.findAll);

};