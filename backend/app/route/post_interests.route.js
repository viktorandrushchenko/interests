module.exports = (app) => {

    const post_interests = require('../controller/post_interests.controller');
    
    // Получение всех пользователей
    app.get('/api/post_interests', post_interests.findAll);

    // Добавление абитуриента
    app.post('/api/addPost_interests', post_interests.create);

    // Обновление данных абитуриента по id
    app.post('/api/updatePost_interests/:id', post_interests.update);

    // Удаление данных абитуриента по id
    app.post('/api/deletePost_interests/:id', post_interests.delete);

    // Получение данных абитуриента по id
    app.get('/api/post_interests/:id', post_interests.findById);
    
    // Получение данных абитуриента по id
    app.get('/api/post_interests/post_id/:post_id', post_interests.findByPost_id);
    
    // Получение данных абитуриента по id
    app.get('/api/post_interests/interest_id/:interest_id', post_interests.findByInterest_id);

};