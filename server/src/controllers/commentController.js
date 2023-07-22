import { createError } from "../error.js";
import Comment from "../models/Comment.js";
import Video from "../models/Video.js";
import User from "../models/User.js";

export const addComment = async (req, res, next) => {
  const newComment = new Comment({ ...req.body, userId: req.user.id });
  try {
    const currentVideo = await Video.findById(req.body.videoId);
    if (!currentVideo) return next(createError(404, "Video not found!"));

    const savedComment = await newComment.save();

    await currentVideo.updateOne({
      $push: { comments: savedComment._id.toString() },
    });

    const tempUser = await User.findById(
      savedComment.userId,
      "username profile"
    ).exec();

    const { _id, ...user } = tempUser._doc;
    res.status(200).json({ ...savedComment._doc, ...user });
  } catch (err) {
    next(err);
  }
};

export const deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(res.params.id);
    if (!comment) return next(createError(404, "Comment not found!"));
    const video = await Video.findById(res.params.id);
    if (
      video &&
      (req.user.id === comment.userId || req.user.id === video.userId)
    ) {
      await video.updateOne({
        $pull: { comments: comment._id.toString() },
      });
      await comment.deleteOne(req.params.id);
      res.status(200).json("The comment has been deleted.");
    } else {
      return next(createError(403, "You can delete ony your comment!"));
    }
  } catch (err) {
    next(err);
  }
};

export const getComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({ videoId: req.params.videoId });
    if (comments) {
      let results = [];
      for (const comment of comments) {
        const tempUser = await User.findById(
          comment.userId,
          "username profile"
        ).exec();
        const { _id, ...user } = tempUser._doc;
        results.push({ ...comment._doc, ...user });
      }
      res.status(200).json(results);
    } else {
      res.status(200).json("No comment record found!");
    }
  } catch (err) {
    next(err);
  }
};
