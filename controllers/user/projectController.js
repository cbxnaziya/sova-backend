const Project = require("../../models/Project");

// Save Project
exports.saveProject = async (req, res) => {
  const {  projectName, projectData } = req.body;
   const userId = req.user.id
  // Validate
  if ( !projectName || !projectData) {
    return res.status(400).json({ success: false, message: 'Missing required fields.' });
  }
  try {
    const newProject = new Project({ userId, projectName, projectData });
    const savedProject = await newProject.save();

    res.status(201).json({
      success: true,
      message: 'Project saved successfully',
      project_id: savedProject._id
    });
  } catch (err) {
    console.error('Error saving project:', err);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
};





exports.getProjectByUserId = async (req, res) => {
  const userId = req.user.id;

  try {
    // Fetch projects for the user
    const projects = await Project.find({ userId });

    if (!projects || projects.length === 0) {
      return res.status(404).json({ success: false, message: "Project not found." });
    }

    // Format the response
    const formattedProjects = projects.map(project => ({
      projectId: project._id,
      projectName: project.projectName,
      projectData: project.projectData
    }));

    return res.status(200).json({
      success: true,
      projects: formattedProjects
    });

  } catch (error) {
    console.error("Error fetching projects:", error);
    return res.status(500).json({ success: false, message: "Server error." });
  }
};

