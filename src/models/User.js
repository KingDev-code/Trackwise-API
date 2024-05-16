const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    roles: {
        type: DataTypes.TEXT,
        get() {
            return this.getDataValue('roles') ? JSON.parse(this.getDataValue('roles')) : null;
        },
        set(val) {
            this.setDataValue('roles', JSON.stringify(val));
        }
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        field: 'is_active'  // Mapeia para o nome de coluna correto se diferente
    },
    lastLogin: {
        type: DataTypes.DATE,
        field: 'last_login'  // Mapeia para o nome de coluna correto se diferente
    }
}, {
    tableName: 'users',  // Nome da tabela conforme definido no Symfony
    timestamps: true,   // Habilita o manuseio automático de timestamps
    createdAt: 'created_at',  // Mapeia para o nome de coluna correto
    updatedAt: 'updated_at'   // Mapeia para o nome de coluna correto
});

module.exports = User;