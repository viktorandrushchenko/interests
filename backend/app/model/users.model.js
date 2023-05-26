module.exports = (sequelize, Sequelize) => {
    var Users = sequelize.define(
        'users', // определяем имя таблицы
        {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },
            username: {
                type: Sequelize.STRING,
                allowNull: false
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false
            }
        });

    // Определяем связи таблицы direction с другими таблицами
    Users.associate = (models) => {
        // Определение связи один-ко-многим с таблицей university. Это определение связи с одной стороны.
        // Связь также определена со второй стороны (со стороны модели university): в файле university.model.js
        Users.hasMany(models.posts, {
            foreignKey: 'user_id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            sourceKey: 'id'
        });

        Users.hasMany(models.user_interests, {
            foreignKey: 'user_id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            sourceKey: 'id'
        });


        
    };
    return Users;
};