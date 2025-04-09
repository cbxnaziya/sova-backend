const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId,ref:'Customer', required: true },
  projectName: { type: String, required: true },
  projectData: { type: Object, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Project', ProjectSchema);
