const QuestionModel = require("../models/question");
const UserModel = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const uniqid = require("uniqid");


module.exports.INSERT_QUESTION = async (req, res) => {
    try {
        const new_question = new QuestionModel({
            question_text: req.body.question_text,
            asked_question_id: uniqid(),
          });
        
          const question = await new_question.save();
        res.status(200).json({response: "New question is created successfully"});
    } catch (err) {
        console.log("ERR", err);
        res.status(500).json({response: "ERROR, please try again"});
    };
};
