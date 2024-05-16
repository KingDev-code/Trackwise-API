const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Project = sequelize.define('Project', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT
    }
}, {
    tableName: 'projects'
});

// Relacionamento
Project.belongsTo(User, { foreignKey: 'userId', as: 'user' });
User.hasMany(Project, { foreignKey: 'userId', as: 'projects' });

module.exports = Project;
