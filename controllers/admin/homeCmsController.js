const HomeCMS = require('../../models/HomeCMS');
const path = require('path');

exports.createHomeCMS = async (req, res) => {
  try {
    const { heading, subHeading, metaTitle, metaDescription } = req.body;
    const backgroundImage = req.file ? req.file.filename : null;

    const newCMS = new HomeCMS({
      heading,
      subHeading,
      metaTitle,
      metaDescription,
      backgroundImage,
    });

    await newCMS.save();
    res.status(201).json({ message: 'CMS section created successfully', data: newCMS });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create CMS section' });
  }
};

exports.getAllCMS = async (req, res) => {
  try {
    const data = await HomeCMS.findOne().sort({ createdAt: -1 });
    res.status(200).json({success:true, home:{heroSection:data}});
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch CMS data' });
  }
};

exports.getCMSById = async (req, res) => {
  try {
    const cms = await HomeCMS.findById(req.params.id);
    if (!cms) return res.status(404).json({ message: 'Not found' });
    res.status(200).json(cms);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch CMS section' });
  }
};

exports.updateCMS = async (req, res) => {
  try {
    const updates = {
      heading: req.body.heading,
      subHeading: req.body.subHeading,
      metaTitle: req.body.metaTitle,
      metaDescription: req.body.metaDescription,
    };

    if (req.file) {
      updates.backgroundImage = req.file.filename;
    }

    const cms = await HomeCMS.findByIdAndUpdate(req.params.id, updates, { new: true });
    res.status(200).json({ message: 'Updated successfully', data: cms });
  } catch (error) {
    res.status(500).json({ error: 'Update failed' });
  }
};

exports.deleteCMS = async (req, res) => {
  try {
    await HomeCMS.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Delete failed' });
  }
};
