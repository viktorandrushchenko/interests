module.exports = (app) => {

    const comments = require('../controller/comments.controller');
    
    // Получение всех пользователей
    app.get('/api/comments', comments.findAll);

    // Добавление абитуриента
    app.post('/api/addComments', comments.create);

    // Обновление данных абитуриента по id
    app.post('/api/updateComments/:id', comments.update);

    // Удаление данных абитуриента по id
    app.post('/api/deleteComments/:id', comments.delete);

    // Получение данных абитуриента по id
    app.get('/api/comments/:id', comments.findById);

    // Получение данных абитуриента по Post _id
    app.get('/api/comments/post_id/:post_id', comments.findByPost_id);
    
    // Получение данных абитуриента по user_id
    app.get('/api/comments/user_id/:user_id', comments.findByUser_id);


};