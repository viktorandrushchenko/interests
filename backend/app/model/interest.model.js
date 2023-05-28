module.exports = (sequelize, Sequelize) => {
    var Interest = sequelize.define(
        'interest', // определяем имя таблицы
        {
            id: {
                type: Sequelize.INTEGER, // тип данных INTEGER
                autoIncrement: true, // включение автоматической нумерации
                primaryKey: true, // поле является первичным ключом
                allowNull: false // настройка allowNull со значением false запрещает запись в поле значений NULL (для поля с настройкой автоинкремента можно не указывать)
            },
            name: {
                type: Sequelize.STRING, // длину не указываем, по умолчанию будет 255
                allowNull: false
            }
        });

        Interest.associate = (models) => {
            // Определение связи один-ко-многим с таблицей direction. Это определение связи с одной стороны.
            // Связь также определена со второй стороны (со стороны модели direction): в файле direction.model.js
            Interest.hasMany(models.posts, {
                foreignKey: 'interest_id',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
                sourceKey: 'id'
            });
            Interest.hasMany(models.user_interests, {
                foreignKey: 'interest_id',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
                sourceKey: 'id'
            });
        };
    return Interest;
};