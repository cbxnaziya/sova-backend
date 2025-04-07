// const Texture = require('../models/Texture');
const Texture = require('../../models/texture');

// Get all textures (ID and category only)
exports.getAllTextures = async (req, res) => {
    try {
      const textures = await Texture.find({}, 'textureId textureCategory');
      res.json({ success: true, textures });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Server Error' });
    }
  };
  
  // Get texture by textureId
  exports.getTextureById = async (req, res) => {

    
    try {
      const texture = await Texture.findOne({ textureId: req.params.texture_id });
  
      if (!texture) {
        return res.status(404).json({ success: false, message: 'Texture not found' });
      }
  
      res.json({ success: true, texture });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Server Error' });
    }
  };
  
  // Create new texture
  exports.createTexture = async (req, res) => {
    const { textureCategory } = req.body;
  
    if (!textureCategory || !req.file) {
      return res.status(400).json({ success: false, message: 'Category and image are required' });
    }
  
    try {
      const textureUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
  
      const newTexture = new Texture({
        textureId: new mongoose.Types.ObjectId(),
        textureCategory,
        textureUrl,
      });
  
      await newTexture.save();
      res.status(201).json({ success: true, texture: newTexture });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Server Error' });
    }
  };
  
  // Update texture by textureId
  exports.updateTexture = async (req, res) => {
    const { textureCategory } = req.body;
  
    try {
      const texture = await Texture.findOne({ textureId: req.params.textureId });
  
      if (!texture) {
        return res.status(404).json({ success: false, message: 'Texture not found' });
      }
  
      if (textureCategory) texture.textureCategory = textureCategory;
      if (req.file) {
        texture.textureUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
      }
  
      await texture.save();
      res.json({ success: true, texture });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Server Error' });
    }
  };
  
  // Delete texture by textureId
  exports.deleteTexture = async (req, res) => {
    try {
      const texture = await Texture.findOneAndDelete({ textureId: req.params.textureId });
  
      if (!texture) {
        return res.status(404).json({ success: false, message: 'Texture not found' });
      }
  
      res.json({ success: true, message: 'Texture deleted successfully' });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Server Error' });
    }
  };