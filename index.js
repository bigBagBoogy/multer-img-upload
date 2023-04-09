const express = require("express");
const app = express();
const path = require("path");

const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Images");
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const multerUpload = multer({ storage: storage });

// app.set("view engine", "ejs");
app.use(express.static("view"));

app.get("/upload", (req, res) => {
  res.render("upload");
});

app.post("/upload", multerUpload.single("image"), (req, res) => {
  res.send("Image Uploaded");
});

app.post("/multiple", multerUpload.array("images", 10), (req, res) => {
  res.send("multiple images Uploaded");
});

app.post("/jsonfile", multerUpload.single("jsonfile"), (req, res) => {
  res.send("jsonfile Uploaded");
});

// non-multer:    MUST BE CHANGED STILL!!!
// app.post("/maarten", something.data("images", 10), (req, res) => {
//   res.send("multiple images Uploaded");
// });

app.listen(3000);
console.log("3000 is the port");
