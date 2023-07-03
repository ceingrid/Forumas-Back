const QuestionModel = require("../models/question");
const uniqid = require("uniqid");
const UserModel = require("../models/user");



module.exports.INSERT_QUESTION = async (req, res) => {
    try {
        const user = await UserModel.findOne({ id: req.body.id });
        const asked_question = await QuestionModel.findOne({ id: req.body.asked_question_id });

        if (!user) {
            return res.status(404).json({err: "User is not logged in"})
        }
        
        const question = new QuestionModel({
            question_text: req.body.question_text,
            asked_question_id: uniqid(),
          });
        
          const savedQuestion = await question.save();

          await UserModel.updateOne(
            { id: req.body.id },
            { $push: {asked_questions_id: savedQuestion} }
          );

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
