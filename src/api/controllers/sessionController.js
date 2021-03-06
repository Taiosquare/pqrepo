const { Question } = require("../models/questionModel");

exports.displaySessionPage = (req, res) => {
  const department = req.query.department;
  const level = req.query.level;
  const session = req.query.session;

  Question.where("department", { $regex: department })
    .where("level", level)
    .where("session", session)
    .exec()
    .then((questions) => {
      let allQuestions = questions.map((q) => {
        return {
          course_name: q.course_name,
          course_code: q.course_code,
          url: q.url,
        };
      });

      res.status(200).render("session.ejs", {
        Questions: allQuestions,
        Session: session,
        Department: department,
        Level: level,
        navigate: "upload",
        nav_title: "Upload Questions",
      });
    })
    .catch((err) => {
      res.status(400).send({ Message: "Error" });
    });
};
