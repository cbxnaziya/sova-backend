const Contact = require("../../models/Contact");

exports.getAllContactForms = async (req, res) => {
  try {
    let contactForms = await Contact.find().populate("user", "name email"); // Fetch all contact forms
    return res.status(200).json({ success: true, forms: contactForms })
  } catch (error) {
    console.log("Error", error);
    return res.status(500).json({ success: false, message: "Internal server error." })
  }
}

exports.updateContactForm = async (req, res) => {
  try {

    const { status } = req.body;
    console.log(status);
    
    const updateForm = Contact.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    )

    if(!updateForm) return res.status(404).json({success:false, message:"Contact form not found."})

      return res.json({ success: true, message: "Status updated successfully",});
  } catch (error) {
    console.log("error", error);
   return  res.status(500).json({ message: error.message });
  }
}