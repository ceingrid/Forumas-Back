const QuestionModel = require("../models/question");
const uniqid = require("uniqid");

// const UserModel = require("../models/user");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");


module.exports.INSERT_QUESTION = async (req, res) => {
    try {
        const question = new QuestionModel({
            question_text: req.body.question_text,
            asked_question_id: uniqid(),
          });
        
          const savedQuestion = await question.save();
        res.status(200).json({response: savedQuestion });

    } catch (err) {
        console.log("ERR", err);
        res.status(500).json({response: "ERROR, please try again"});
    };
};

module.exports.DELETE_QUESTION = async (req, res) => {
    try {
      await QuestionModel.deleteOne({ id: req.params.asked_question_id}).exec();
  
      return res.status(200).json({ statusMessage: "Deleted successfully" });
    } catch (err) {
      console.log("err", err);
      res.status(500).json({ response: "Failed" });
    }
  };
