module.exports = (app) => {

    const user_interests = require('../controller/user_interests.controller');
    
    // Получение всех пользователей
    app.get('/api/user_interests', user_interests.findAll);

    // Добавление абитуриента
    app.post('/api/addUser_interests', user_interests.create);

    // Обновление данных абитуриента по id
    app.post('/api/updateUser_interests/:id', user_interests.update);

    // Удаление данных абитуриента по id
    app.post('/api/deleteUser_interests/:id', user_interests.delete);

    // Получение данных абитуриента по id
    app.get('/api/user_interests/:id', user_interests.findById);

    // Получение данных абитуриента по user_id
    app.get('/api/user_interests/user_id/:user_id', user_interests.findByUser_id);
  
    // Получение данных абитуриента по фамилии
    app.get('/api/user_interests/interest_id/:interest_id', user_interests.findByInterest_id);

    app.get('/api/user_interests/interest_user_id/:interest_id/:user_id', user_interests.searchUser_interestsByUserIdInterestId);
};

