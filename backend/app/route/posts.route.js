module.exports = (app) => {

    const posts = require('../controller/posts.controller');
    
    // Получение всех пользователей
    app.get('/api/posts', posts.findAll);

    // Добавление абитуриента
    app.post('/api/addPosts', posts.create);

    // Обновление данных абитуриента по id
    app.post('/api/updatePosts/:id', posts.update);

    // Удаление данных абитуриента по id
    app.post('/api/deletePosts/:id', posts.delete);

    // Получение данных абитуриента по id
    app.get('/api/posts/:id', posts.findById);

};