// import multer from "multer";
// import path from "path";
// import fs from "fs";
const multer = require("multer");
const path = require("path");
const fs = require("fs")

// Ensure uploads/category exists
const dir = "uploads/category";
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/category");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = `${Date.now()}-${file.originalname}`;
    cb(null, name);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "model/gltf-binary") cb(null, true);
  else cb(new Error("Only .glb files allowed!"), false);
};

const upload = multer({ storage, fileFilter });
// export default upload;
module.exports = upload
