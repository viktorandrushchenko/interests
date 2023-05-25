module.exports = (sequelize, Sequelize) => {
    var Post_interests = sequelize.define(
        'post_interests', // определяем имя таблицы
        {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },
            post_id: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            interest_id: {
                type: Sequelize.INTEGER,
                allowNull: false
            }
        });

    // Определяем связи таблицы direction с другими таблицами
    Post_interests.associate = (models) => {
        // Определение связи один-ко-многим с таблицей university. Это определение связи с одной стороны.
        // Связь также определена со второй стороны (со стороны модели university): в файле university.model.js
        Post_interests.belongsTo(models.interest, {
            foreignKey: 'interest_id'
        });

        // Определение связи один-ко-многим с таблицей statement. Это определение связи с одной стороны.
        // Связь также определена со второй стороны (со стороны модели statement): в файле statement.model.js
        Post_interests.belongsTo(models.posts, {
            foreignKey: 'post_id'
        });

        
    };
    return Post_interests;
};