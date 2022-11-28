const express = require('express');
const multer = require('multer');
const app = express();
var router = express.Router();
module.exports = router;
 
app.use(express.json());
console.log(__dirname + '/uploads');
app.use(express.static(__dirname + '/uploads'));

app.listen(3000, () =>
{
    console.log("서버시작, 3000번 포트");
});
 
let storage = multer.diskStorage({
    destination: function(req, file, callback){
        callback(null, "uploads/");
    },
    filename: function(req, file, callback){
        callback(null, file.originalname);
    }
});
 
let upload = multer({
    storage: storage
});

app.get('/api/download/:filename', (req, res) => {
  const file = 'uploads/' + req.params.filename;
  res.download(file);
  return res;
})

app.post('/api/uploadimage', upload.single("Texture"), (req, res, next) =>
{
    console.log("접속함");
 
    res.status(200)
    res.json({
      requestType: "Texture",
      requestUrl: `http://localhost:3000/api/download/${req.file.filename}`
    });

    return res;
});
