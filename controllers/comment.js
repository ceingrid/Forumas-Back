const CommentModel = require("../models/comment");
const QuestionModel = require("../models/question");
const UserModel = require("../models/user")
const uniqid = require("uniqid");

module.exports.INSERT_COMMENT = async (req, res) => {
    try {
      const theQuestion = await QuestionModel.findOne({ asked_question_id: req.params.asked_question_id });
  
      if (!theQuestion) {
        return res.status(404).json({err: "Question is not available"})
      }
  
      const comment = new CommentModel({
        comment_text: req.body.comment_text,
        answer_id: uniqid(),
      });
  
      const newComment = await comment.save();
  
      await QuestionModel.updateOne(
        { _id: asked_question_id },
        { $push: {answers_id: newComment} }
      );
  
      return res.status(200).json({ response: newComment });
    } catch (err) {
      console.log("err", err);
      return res.status(500).json({ response: "ERROR" });
    }
  };
  

// module.exports.INSERT_COMMENT = async (req, res) => {
//     try {
//         const user = await UserModel.findOne({ id: req.body.id });
//         const asked_question_id = await QuestionModel.findOne({ id: req.body.asked_question_id });

//         if (!user) {
//             return res.status(404).json({err: "User is not logged in"})
//         }

//       const comment = new CommentModel({
//         comment_text: req.body.comment_text,
//         answer_id: uniqid(),
//       });

//       const newComment = await comment.save();
  
//       await QuestionModel.updateOne(
//         { _id: req.body.asked_question_id },
//         { $push: {answers_id: newComment} }
//       );

//       return res.status(200).json({ response: newComment });
//     } catch (err) {
//       console.log("err", err);
//       return res.status(500).json({ response: "ERROR" });
//     }
//   };
  