const express = require("express"),
  multer = require("multer"),
  storage = require("../config/cloudinary"),
  api = express.Router(),
  indexRouter = require("./routers/indexRouter"),
  downloadRouter = require("./routers/downloadRouter"),
  uploadRouter = require("./routers/uploadRouter"),
  schoolRouter = require("./routers/schoolRouter"),
  departmentRouter = require("./routers/departmentRouter"),
  levelRouter = require("./routers/levelRouter"),
  sessionRouter = require("./routers/sessionRouter"),
  questionRouter = require("./routers/questionRouter");

const parser = multer({ storage: storage });

api.use("/download", downloadRouter);
api.use("/upload", uploadRouter);
api.use("/school", schoolRouter);
api.use("/department", departmentRouter);
api.use("/level", levelRouter);
api.use("/session", sessionRouter);
api.use("/question", questionRouter);
api.use("/", indexRouter);

api.post("/images", parser.array("image"), (req, res) => {
  try {
    const events = JSON.parse(JSON.stringify(req.files));

    const urls = [];

    // events.map((e) => {
    //   const url = e.path.split("/");
    //   const first = url.slice(0, 6);
    //   const second = url.slice(6);
    //   const final = [...first, "f_auto,q_auto", ...second];

    //   urls.push(final.join("/"));
    // });

    events.map((e) => {
      const url = e.path;

      urls.push(url);
    });

    if (urls.length > 0) {
      res.status(200).send({ URLS: urls });
    } else {
      res.status(400).send({ URLS: "" });
    }
  } catch {
    res.status(500).send({ Error: "Server Error" });
  }
});

module.exports = api;
