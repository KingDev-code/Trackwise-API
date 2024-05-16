const Article = require('../models/Article');

// List Article
exports.listArticles = async (req, res) => {
    try {
        const articles = await Article.findAll();
        res.json(articles);
    } catch (error) {
        console.error('Error listing articles:', error);
        res.status(500).json({ message: "Error listing articles" });
    }
};

// Create Article
exports.createArticle = async (req, res) => {
    try {
        const { title, content, projectId } = req.body;
        const article = await Article.create({
            title,
            content,
            projectId
        });
        res.status(201).json(article);
    } catch (error) {
        console.error('Error creating article:', error);
        res.status(500).json({ message: "Error creating article" });
    }
};

// Geting Article for ID
exports.getArticle = async (req, res) => {
    try {
        const article = await Article.findByPk(req.params.id);
        if (!article) {
            return res.status(404).json({ message: "Article not found" });
        }
        res.json(article);
    } catch (error) {
        console.error('Error getting article:', error);
        res.status(500).json({ message: "Error getting article" });
    }
};

// Geting for ID of Projects
exports.getArticlesByProjectId = async (req, res) => {
    try {
        const projectId = req.params.projectId; // Obter o ID do projeto dos parâmetros da rota
        const articles = await Article.findAll({
            where: { projectId: projectId }
        });

        if (articles.length === 0) {
            console.log('No articles found for this project')
            return res.json([]);
        }
        
        res.json(articles);
    } catch (error) {
        console.error('Error getting articles by project ID:', error);
        res.status(500).json({ message: "Error getting articles" });
    }
};


// Update Article
exports.updateArticle = async (req, res) => {
    try {
        const article = await Article.findByPk(req.params.id);
        if (!article) {
            return res.status(404).json({ message: "Article not found" });
        }
        const { title, content } = req.body;
        article.title = title;
        article.content = content;
        await article.save();
        res.json(article);
    } catch (error) {
        console.error('Error updating article:', error);
        res.status(500).json({ message: "Error updating article" });
    }
};

// Delete Article
exports.deleteArticle = async (req, res) => {
    try {
        const article = await Article.findByPk(req.params.id);
        if (!article) {
            return res.status(404).json({ message: "Article not found" });
        }
        await article.destroy();
        res.status(204).send(); // No content to send back
    } catch (error) {
        console.error('Error deleting article:', error);
        res.status(500).json({ message: "Error deleting article" });
    }
};