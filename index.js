const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");

const multer = require("multer");
const { stringify } = require("querystring");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Images");
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, file.originalname);
    // cb(null, Date.now() + path.extname(file.originalname));
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

app.post("/stats", multerUpload.single("uploaded_file"), function (req, res) {
  // console.log(req.file);
  // console.log("-------------------------------------");
  console.log(req.body);
  const metaData = stringify(req.body);
  console.log(metaData);
  res.send(
    `Succes uploading! ${decodeURI(metaData)}, please go to previous page`
  );
  //Now we want to use FS to fsWriteFile(req.body, "./metadata.json")
  let data = metaData;
  fs.writeFileSync("metadata.json", data);
  console.log("File written successfully\n");
  console.log("The written has the following contents:");
  console.log(fs.readFileSync("metadata.json", "utf8"));
});

// non-multer:    MUST BE CHANGED STILL!!!
// app.post("/maarten", something.data("images", 10), (req, res) => {
//   res.send("multiple images Uploaded");
// });

app.listen(3000);
console.log("3000 is the port");
