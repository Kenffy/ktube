import express from "express";
import {
  addComment,
  deleteComment,
  dislike,
  getComments,
  like,
} from "../controllers/commentController.js";
import { verifyToken } from "../verifyToken.js";
const router = express.Router();

router.post("/", verifyToken, addComment);
router.delete("/:id", verifyToken, deleteComment);
router.get("/:videoId", getComments);
router.put("/like/:commentId", verifyToken, like);
router.put("/dislike/:commentId", verifyToken, dislike);

export default router;
