module.exports = (sequelize, Sequelize) => {
    var User_interests = sequelize.define(
        'user_interests', // определяем имя таблицы
        {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },
            user_id: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            interest_id: {
                type: Sequelize.INTEGER,
                allowNull: false    
            },
            admin: {
                type: Sequelize.BOOLEAN,
                allowNull: false    
            }
        });

    // Определяем связи таблицы direction с другими таблицами
    User_interests.associate = (models) => {
        // Определение связи один-ко-многим с таблицей university. Это определение связи с одной стороны.
        // Связь также определена со второй стороны (со стороны модели university): в файле university.model.js
        User_interests.belongsTo(models.users, {
            foreignKey: 'user_id'
        });

        User_interests.belongsTo(models.interest, {
            foreignKey: 'interest_id'
        });


        
    };
    return User_interests;
};