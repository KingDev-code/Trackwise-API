const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController');
const verifyToken = require('../middleware/verifyToken');

/**
 * @openapi
 * /articles:
 *   get:
 *     tags:
 *       - Articles
 *     summary: List all articles
 *     description: Retrieves a list of all articles stored in the database.
 *     responses:
 *       200:
 *         description: An array of articles is successfully retrieved.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Article'
 *       500:
 *         description: Internal server error
 */
router.get('/', articleController.listArticles);

/**
 * @openapi
 * /articles:
 *   post:
 *     tags:
 *       - Articles
 *     summary: Create a new article
 *     description: Creates a new article with the provided title and content. Ensures that the title is unique and the content is not empty.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Article'
 *     responses:
 *       201:
 *         description: Article created successfully
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               title: "Interesting Article Title"
 *               content: "Content of the article here..."
 *       400:
 *         description: Invalid input, object invalid
 *       401:
 *         description: Unauthorized, token is invalid or missing
 *       500:
 *         description: Internal server error
 */
router.post('/', verifyToken, articleController.createArticle);

/**
 * @openapi
 * /articles/{id}:
 *   get:
 *     tags:
 *       - Articles
 *     summary: Get a specific article by ID
 *     description: Retrieves details of a specific article by ID. The ID must correspond to an existing article in the database.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the article to retrieve
 *     responses:
 *       200:
 *         description: Details of an article
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Article'
 *       404:
 *         description: Article not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', articleController.getArticle);

/**
 * @openapi
 * /articles/projects/{projectId}:
 *   get:
 *     tags:
 *       - Articles
 *     summary: Get articles by project ID
 *     description: Retrieves all articles associated with a specific project ID. The project ID must correspond to an existing project.
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the project associated with the articles
 *     responses:
 *       200:
 *         description: An array of articles related to the project
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Article'
 *       404:
 *         description: No articles found for this project ID
 *       500:
 *         description: Internal server error
 */
router.get('/projects/:projectId', articleController.getArticlesByProjectId);

/**
 * @openapi
 * /articles/{id}:
 *   put:
 *     tags:
 *       - Articles
 *     summary: Update an article by ID
 *     description: Updates an article by ID with the provided data. The ID must correspond to an existing article.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Article'
 *     responses:
 *       200:
 *         description: Article updated successfully
 *       400:
 *         description: Invalid input, object invalid
 *       404:
 *         description: Article not found
 *       500:
 *         description: Internal server error
 */
router.put('/:id', verifyToken, articleController.updateArticle);

/**
 * @openapi
 * /articles/{id}:
 *   delete:
 *     tags:
 *       - Articles
 *     summary: Delete an article by ID
 *     description: Deletes a specific article by ID. The ID must correspond to an existing article.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Article deleted successfully
 *       404:
 *         description: Article not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', verifyToken, articleController.deleteArticle);

module.exports = router;