module.exports = (sequelize, Sequelize) => {
    var Posts = sequelize.define(
        'posts', // определяем имя таблицы
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
            title: {
                type: Sequelize.STRING,
                allowNull: false
            },
            body: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            interest_id: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false
            }
        });

    // Определяем связи таблицы direction с другими таблицами
    Posts.associate = (models) => {
        // Определение связи один-ко-многим с таблицей university. Это определение связи с одной стороны.
        // Связь также определена со второй стороны (со стороны модели university): в файле university.model.js
        Posts.belongsTo(models.interest, {
            foreignKey: 'interest_id'
        });


        // Определение связи один-ко-многим с таблицей statement. Это определение связи с одной стороны.
        // Связь также определена со второй стороны (со стороны модели statement): в файле statement.model.js
        Posts.belongsTo(models.users, {
            foreignKey: 'user_id'
        });

        
    };
    return Posts;
};