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
        field: 'is_active'  // Maps to the correct column name if different
    },
    lastLogin: {
        type: DataTypes.DATE,
        field: 'last_login'  // Maps to the correct column name if different
    }
}, {
    tableName: 'users',  // Table name as defined in Symfony
    timestamps: true,   // Enables automatic handling of timestamps
    createdAt: 'created_at',  // Maps to the correct column name
    updatedAt: 'updated_at'   // Maps to the correct column name
});

module.exports = User;