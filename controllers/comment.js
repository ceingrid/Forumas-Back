const uniqid = require("uniqid");
const CommentModel = require("../models/comment");


module.exports.INSERT_COMMENT = async (req, res) => {
    try {
      const comment = new CommentModel({
        comment_text: req.body.comment_text,
        id: uniqid(),
      });
  
      const newComment = await comment.save();
  
      return res.status(200).json({ response: newComment });
    } catch (err) {
      console.log("err", err);
      return res.status(500).json({ response: "ERROR" });
    }
  };
  