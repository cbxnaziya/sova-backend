const mongoose = require('mongoose');

const textureSchema = new mongoose.Schema({
    textureId: { type: mongoose.Schema.Types.ObjectId, required: true },
    textureCategory: { type: String, required: true,  },
    textureUrl: {  type: String,   required: true, },
});

module.exports = mongoose.model('Texture', textureSchema);
