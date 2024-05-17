const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Project = require('./Project'); // Import the Project model

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

// Relationship: A project can have many articles
Project.hasMany(Article, { foreignKey: 'projectId' });
Article.belongsTo(Project, { foreignKey: 'projectId' });

module.exports = Article;