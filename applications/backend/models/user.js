const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        passwordHash: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: '',
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        tableName: 'user',
        timestamps: false,
        hooks: {
            beforeCreate: async (user) => {
                if (!user.passwordHash) {
                    const defaultPassword = 'defaultPassword123';
                    user.passwordHash = await bcrypt.hash(defaultPassword, 10);
                }
            }
        }
    });

    User.associate = (models) => {
        User.hasMany(models.Post, { foreignKey: 'authorId' });
    };

    return User;
};
