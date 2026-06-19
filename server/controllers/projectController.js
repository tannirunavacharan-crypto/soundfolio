const Project = require('../models/Project');

// @desc    Get all client projects
// @route   GET /api/projects
// @access  Public
const getProjects = async (req, res) => {
  try {
    const { type, year } = req.query;
    let query = {};

    // Filter by project type
    if (type && type !== 'All') {
      query.projectType = type;
    }

    // Filter by year
    if (year && year !== 'All') {
      query.year = parseInt(year);
    }

    const projects = await Project.find(query).sort({ year: -1, createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: projects.length,
      data: projects,
    });
  } catch (error) {
    console.error('Get Projects Error:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Create a client project
// @route   POST /api/projects
// @access  Private/Admin
const createProject = async (req, res) => {
  try {
    const { clientName, projectType, description, imageUrl, year } = req.body;

    if (!clientName || !projectType || !description || !year) {
      return res.status(400).json({ success: false, message: 'Please provide clientName, projectType, description, and year' });
    }

    const project = await Project.create({
      clientName,
      projectType,
      description,
      imageUrl,
      year: parseInt(year),
    });

    return res.status(201).json({
      success: true,
      data: project,
    });
  } catch (error) {
    console.error('Create Project Error:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Update a client project
// @route   PUT /api/projects/:id
// @access  Private/Admin
const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    let project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    if (req.body.year) {
      req.body.year = parseInt(req.body.year);
    }

    project = await Project.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json({
      success: true,
      data: project,
    });
  } catch (error) {
    console.error('Update Project Error:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Delete a client project
// @route   DELETE /api/projects/:id
// @access  Private/Admin
const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    await project.deleteOne();

    return res.status(200).json({
      success: true,
      message: 'Project removed successfully',
    });
  } catch (error) {
    console.error('Delete Project Error:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
};
