module.exports = (app) => {

    const interest = require('../controller/interest.controller');
    
    // Получение всех пользователей
    app.get('/api/interests', interest.findAll);

    // Добавление абитуриента
    app.post('/api/addInterest', interest.create);

    // Обновление данных абитуриента по id
    app.post('/api/updateInterest/:id', interest.update);

    // Удаление данных абитуриента по id
    app.post('/api/deleteInterest/:id', interest.delete);

    // Получение данных абитуриента по id
    app.get('/api/interest/:id', interest.findById);

    // Получение данных абитуриента по фамилии
    app.get('/api/interest/name/:name', interest.findByName);
};