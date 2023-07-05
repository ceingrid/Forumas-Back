const CommentModel = require("../models/comment");
const QuestionModel = require("../models/question");
const UserModel = require("../models/user")
const uniqid = require("uniqid");

module.exports.INSERT_COMMENT = async (req, res) => {
    console.log(req.params);
    try {
        const theQuestion = await QuestionModel.findOne({ id: req.params.id});

        if (!theQuestion) {
            return res.status(404).json({err: "Question is not available"})
        }

        const comment = new CommentModel({
            comment_text: req.body.comment_text,
            answer_id: uniqid(),
        });

        const newComment = await comment.save();

        await QuestionModel.updateOne(
            { id: req.params.id },
            { $push: {answers_id: newComment} }
        );

        return res.status(200).json({ response: newComment });
    } catch (err) {
        console.log("err", err);
        return res.status(500).json({ response: "ERROR" });
    }
};

module.exports.DELETE_COMMENT = async (req, res) => {
    try {
      await CommentModel.deleteOne({ id: req.params.id}).exec();
  
      return res.status(200).json({ statusMessage: "Deleted successfully" });
    } catch (err) {
      console.log("err", err);
      res.status(500).json({ response: "Failed" });
    }
  };

  module.exports.GET_ALL_COMMENTS = async (req, res) => {
    try {
      const comments = await CommentModel.find({}, 'comment_text -_id');
      res.status(200).json({ comments: comments });
    } catch (err) {
      console.log("ERR", err);
      res.status(500).json({ response: "ERROR, please try later" });
    }
  };