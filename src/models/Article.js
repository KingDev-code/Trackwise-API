// src/models/Article.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Project = require('./Project'); // Importe o modelo Project

const Article = sequelize.define('Article', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    projectId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Project,
            key: 'id'
        }
    }
}, {
    tableName: 'articles'
});

// Relacionamento: Um projeto pode ter muitos artigos
Project.hasMany(Article, { foreignKey: 'projectId' });
Article.belongsTo(Project, { foreignKey: 'projectId' });

module.exports = Article;