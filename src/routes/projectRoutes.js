const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const verifyToken = require('../middleware/verifyToken');

/**
 * @openapi
 * /projects:
 *   get:
 *     tags:
 *       - Projects
 *     summary: List all projects
 *     description: Retrieves a list of all projects available in the system. Useful for getting an overview of all current projects.
 *     responses:
 *       200:
 *         description: An array of projects is successfully retrieved.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Project'
 *       500:
 *         description: Internal server error
 */
router.get('/', projectController.listProjects);

/**
 * @openapi
 * /projects:
 *   post:
 *     tags:
 *       - Projects
 *     summary: Create a new project
 *     description: Creates a new project with the provided data, including project details like name and description.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Project'
 *     responses:
 *       201:
 *         description: Project created successfully
 *         content:
 *           application/json:
 *             example:
 *               id: 10
 *               name: "New Project"
 *               description: "Description of the new project"
 *       400:
 *         description: Bad request, check the request body for errors.
 *       401:
 *         description: Unauthorized, valid token is required.
 *       500:
 *         description: Internal server error
 */
router.post('/', verifyToken, projectController.createProject);

/**
 * @openapi
 * /projects/{id}:
 *   get:
 *     tags:
 *       - Projects
 *     summary: Get a specific project by ID
 *     description: Retrieves details of a specific project by its unique ID. Useful for getting detailed information about a project.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Unique identifier of the project.
 *     responses:
 *       200:
 *         description: Details of the project
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project'
 *       404:
 *         description: Project not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', projectController.getProject);

/**
 * @openapi
 * /projects/user/{userId}:
 *   get:
 *     tags:
 *       - Projects
 *     summary: Get projects by user ID
 *     description: Retrieves all projects associated with a specific user's ID. Useful for managers or users tracking multiple projects.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The user ID of the project owner.
 *     responses:
 *       200:
 *         description: An array of projects related to the user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Project'
 *       404:
 *         description: No projects found for this user
 *       500:
 *         description: Internal server error
 */
router.get('/user/:userId', projectController.getProjectsByUserId);

/**
 * @openapi
 * /projects/{id}:
 *   put:
 *     tags:
 *       - Projects
 *     summary: Update a project by ID
 *     description: Updates the details of an existing project based on the provided information. Can include changes to the project's name, description, and status.
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
 *             $ref: '#/components/schemas/Project'
 *     responses:
 *       200:
 *         description: Project updated successfully
 *       400:
 *         description: Bad request, check the request body for errors.
 *       404:
 *         description: Project not found
 *       500:
 *         description: Internal server error
 */
router.put('/:id', verifyToken, projectController.updateProject);

/**
 * @openapi
 * /projects/{id}:
 *   delete:
 *     tags:
 *       - Projects
 *     summary: Delete a project by ID
 *     description: Deletes a specific project by ID. Useful for removing projects that are completed or cancelled.
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
 *         description: Project deleted successfully
 *       404:
 *         description: Project not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', verifyToken, projectController.deleteProject);

module.exports = router;
