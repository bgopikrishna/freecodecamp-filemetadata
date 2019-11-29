const express = require("express");
const cors = require("cors");
const formidable = require("formidable");

const app = express();

app.use(cors({ optionSuccessStatus: 200 }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.post("/api/fileanalyse", (req, res) => {
  new formidable.IncomingForm()
    .parse(req)
    .on("file", (formName, file) => {
      const {type, size, name} = file;

      res.send({type, size, name})
    })
    .on("error", err => {
     res.send({error:"Error uploading file"})
    })
    .on("end", () => {
      res.end();
    });
});

const port = process.env.PORT || 3000;
const listener = app.listen(port, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
