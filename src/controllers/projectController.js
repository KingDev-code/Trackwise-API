const Project = require('../models/Project');
const User = require('../models/User');

exports.listProjects = async (req, res) => {
  try {
    const projects = await Project.findAll();
    res.json(projects);
  } catch (error) {
    console.error('Error listing projects:', error);
    res.status(500).json({ message: 'Error listing projects' });
  }
};

exports.createProject = async (req, res) => {
    try {
        const { name, description, userId } = req.body;

        // Encontrar o usuário baseado no userId fornecido
        const user = await User.findByPk(userId);
        console.log(user);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Criando o projeto e associando ao usuário
        const project = await Project.create({
            name,
            description,
            userId: user.id  // Associando o usuário ao projeto
        });

        res.status(201).json(project);
    } catch (error) {
        console.error('Error creating project:', error);
        res.status(500).json({ message: "Error creating project" });
    }
};

exports.getProject = async (req, res) => {
  try {
    const projectId = req.params.id;
    const project = await Project.findByPk(projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found.' });
    }
    res.json(project);
  } catch (error) {
    console.error('Error getting project:', error);
    res.status(500).json({ message: 'Error getting project' });
  }
};

// Get projects by User ID
exports.getProjectsByUserId = async (req, res) => {
  try {
      const userId = req.params.userId; // Obter o ID do usuário dos parâmetros da rota
      const projects = await Project.findAll({
          where: { userId: userId }
      });

      if (projects.length === 0) {
          console.log('No projects found for this user');
          return res.status(404).json({ message: "No projects found" });
      }
      
      res.json(projects);
  } catch (error) {
      console.error('Error getting projects by user ID:', error);
      res.status(500).json({ message: "Error getting projects" });
  }
};


exports.updateProject = async (req, res) => {
  try {
    const projectId = req.params.id;
    const { name, description } = req.body;
    const project = await Project.findByPk(projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found.' });
    }

    project.name = name;
    project.description = description;
    await project.save();

    res.json(project);
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({ message: 'Error updating project' });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const projectId = req.params.id;
    const project = await Project.findByPk(projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found.' });
    }

    await project.destroy();
    res.status(204).send(); // Nenhum conteúdo para enviar após a exclusão
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ message: 'Error deleting project' });
  }
};