import express from "express";
import {
  addVideo,
  updateVideo,
  deleteVideo,
  addView,
  getByTag,
  getVideo,
  getUserVideos,
  getUserShorts,
  search,
  sub,
  trend,
  getRandomVideos,
  getRandomShorts,
  getAllVideos,
  like,
  dislike,
} from "../controllers/videoController.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

//create a video
router.post("/", verifyToken, addVideo);
router.put("/:id", verifyToken, updateVideo);
router.put("/like/:videoId", verifyToken, like);
router.put("/dislike/:videoId", verifyToken, dislike);
router.put("/view/:id", addView);
router.delete("/:id", verifyToken, deleteVideo);

router.get("/", getAllVideos);
router.get("/trend", trend);
router.get("/tags", getByTag);
router.get("/search", search);
router.get("/random", getRandomVideos);
router.get("/sub", verifyToken, sub);

router.get("/find/:id", getVideo);
router.get("/:id", getUserVideos);
router.get("/shorts/:id", getUserShorts);
router.get("/random/shorts", getRandomShorts);

export default router;
