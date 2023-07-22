import User from "../models/User.js";
import Video from "../models/Video.js";
import { createError } from "../error.js";

export const addVideo = async (req, res, next) => {
  const newVideo = new Video({ userId: req.user.id, ...req.body });
  try {
    const savedVideo = await newVideo.save();
    const tempUser = await User.findById(savedVideo.userId);

    await tempUser.updateOne({
      $push: { videos: savedVideo._id.toString() },
    });

    const user = {
      username: tempUser.username,
      profile: tempUser.profile,
      subscribers: tempUser.subscribers,
    };

    res.status(200).json({ ...savedVideo._doc, ...user });
  } catch (err) {
    next(err);
  }
};

export const updateVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return next(createError(404, "Video not found!"));
    if (req.user.id === video.userId) {
      const updatedVideo = await Video.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );

      const tempUser = await User.findById(
        video.userId,
        "username profile subscribers"
      ).exec();
      const { _id, ...user } = tempUser._doc;
      res.status(200).json({ ...updatedVideo._doc, ...user });
    } else {
      return next(createError(403, "You can update only your video!"));
    }
  } catch (err) {
    next(err);
  }
};

export const deleteVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return next(createError(404, "Video not found!"));
    const user = await User.findById(video.userId);
    if (user && req.user.id === video.userId) {
      if (user.videos.includes(video._id.toString())) {
        await user.updateOne({
          $pull: { videos: video._id.toString() },
        });
      }
      await video.deleteOne();
      res.status(200).json("The video has been deleted.");
    } else {
      return next(createError(403, "You can delete only your video!"));
    }
  } catch (err) {
    next(err);
  }
};

export const like = async (req, res, next) => {
  const id = req.user.id;
  const videoId = req.params.videoId;
  try {
    await Video.findByIdAndUpdate(videoId, {
      $addToSet: { likes: id },
      $pull: { dislikes: id },
    });
    res.status(200).json("The video has been liked.");
  } catch (err) {
    next(err);
  }
};

export const dislike = async (req, res, next) => {
  const id = req.user.id;
  const videoId = req.params.videoId;
  try {
    await Video.findByIdAndUpdate(videoId, {
      $addToSet: { dislikes: id },
      $pull: { likes: id },
    });
    res.status(200).json("The video has been disliked.");
  } catch (err) {
    next(err);
  }
};

export const getVideo = async (req, res, next) => {
  try {
    const video = await Video.findOneAndUpdate(
      { _id: req.params.id },
      { $inc: { views: 1 } },
      { new: true }
    );

    const tempUser = await User.findById(
      video.userId,
      "username profile subscribers"
    ).exec();
    const { _id, ...user } = tempUser._doc;
    res.status(200).json({ ...video._doc, ...user });
  } catch (err) {
    next(err);
  }
};

export const addView = async (req, res, next) => {
  try {
    await Video.findByIdAndUpdate(req.params.id, {
      $inc: { views: 1 },
    });
    res.status(200).json("The view has been increased.");
  } catch (err) {
    next(err);
  }
};

export const getAllVideos = async (req, res, next) => {
  try {
    const videos = await Video.aggregate([{ $match: { isShort: false } }]);

    const l_videos = await fetchAllUserInfos(videos);

    if (l_videos) {
      res.status(200).json(l_videos);
    } else {
      res.status(200).json("No comment record found!");
    }
  } catch (err) {
    next(err);
  }
};

export const getAllShorts = async (req, res, next) => {
  try {
    const videos = await Video.aggregate([{ $match: { isShort: true } }]);

    const l_videos = await fetchAllUserInfos(videos);

    if (l_videos) {
      res.status(200).json(l_videos);
    } else {
      res.status(200).json("No comment record found!");
    }
  } catch (err) {
    next(err);
  }
};

export const getRandomVideos = async (req, res, next) => {
  try {
    const videos = await Video.aggregate([
      { $match: { isShort: false } },
      { $sample: { size: 20 } },
    ]);

    const l_videos = await fetchAllUserInfos(videos);

    if (l_videos) {
      res.status(200).json(l_videos);
    } else {
      res.status(200).json("No comment record found!");
    }
  } catch (err) {
    next(err);
  }
};

export const getRandomShorts = async (req, res, next) => {
  try {
    const shorts = await Video.aggregate([
      { $match: { isShort: true } },
      { $sample: { size: 20 } },
    ]);

    const l_shorts = await fetchAllUserInfos(shorts);

    if (l_shorts) {
      res.status(200).json(l_shorts);
    } else {
      res.status(200).json("No comment record found!");
    }
  } catch (err) {
    next(err);
  }
};

export const getUserVideos = async (req, res, next) => {
  try {
    const videos = await Video.find({
      isShort: false,
      userId: req.params.id,
    });
    if (videos) {
      let results = [];
      for (const video of videos) {
        const tempUser = await User.findById(
          video.userId,
          "username profile subscribers"
        ).exec();
        const { _id, ...user } = tempUser._doc;
        results.push({ ...video?._doc, ...user });
      }
      res.status(200).json(results);
    } else {
      res.status(200).json("No comment record found!");
    }
  } catch (err) {
    next(err);
  }
};

export const getUserShorts = async (req, res, next) => {
  try {
    const videos = await Video.find({
      isShort: true,
      userId: req.params.id,
    });
    if (videos) {
      let results = [];
      for (const video of videos) {
        const tempUser = await User.findById(
          video.userId,
          "username profile subscribers"
        ).exec();
        const { _id, ...user } = tempUser._doc;
        results.push({ ...video?._doc, ...user });
      }
      res.status(200).json(results);
    } else {
      res.status(200).json("No comment record found!");
    }
  } catch (err) {
    next(err);
  }
};

export const trend = async (req, res, next) => {
  try {
    const videos = await Video.find().sort({ views: -1 });
    if (videos) {
      let results = [];
      for (const video of videos) {
        const tempUser = await User.findById(
          video.userId,
          "username profile subscribers"
        ).exec();
        const { _id, ...user } = tempUser._doc;
        results.push({ ...video, ...user });
      }
      res.status(200).json(results);
    } else {
      res.status(200).json("No comment record found!");
    }
  } catch (err) {
    next(err);
  }
};

export const sub = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const subscribedChannels = user.subscriptions;

    const list = await Promise.all(
      subscribedChannels.map(async (channelId) => {
        let results = [];
        const tempUser = await User.findById(
          channelId,
          "username profile subscribers"
        ).exec();
        const { _id, ...friend } = tempUser._doc;
        const videos = await Video.find({ userId: channelId });
        for (const video of videos) {
          results.push({ ...video._doc, ...friend });
        }
        return results;
      })
    );

    res.status(200).json(list.flat().sort((a, b) => b.createdAt - a.createdAt));
  } catch (err) {
    next(err);
  }
};

export const getByTag = async (req, res, next) => {
  const tags = req.query.tags.split(",");
  try {
    const videos = await Video.find({ tags: { $in: tags } }).limit(20);
    if (videos) {
      let results = [];
      for (const video of videos) {
        const tempUser = await User.findById(
          video.userId,
          "username profile subscribers"
        ).exec();
        const { _id, ...user } = tempUser._doc;
        results.push({ ...video, ...user });
      }
      res.status(200).json(results);
    } else {
      res.status(200).json("No comment record found!");
    }
  } catch (err) {
    next(err);
  }
};

export const search = async (req, res, next) => {
  const query = req.query.q;
  try {
    const videos = await Video.find({
      title: { $regex: query, $options: "i" },
    }).limit(40);
    if (videos) {
      let results = [];
      for (const video of videos) {
        const tempUser = await User.findById(
          video.userId,
          "username profile subscribers"
        ).exec();
        const { _id, ...user } = tempUser._doc;
        results.push({ ...video, ...user });
      }
      res.status(200).json(results);
    } else {
      res.status(200).json("No comment record found!");
    }
  } catch (err) {
    next(err);
  }
};

const fetchUserInfos = async (video) => {
  let result;
  if (!video) return result;

  const tempUser = await User.findById(
    video.userId,
    "username profile subscribers"
  ).exec();
  const { _id, ...user } = tempUser._doc;
  result = { ...video, ...user };
};

const fetchAllUserInfos = async (videos) => {
  let results = [];
  if (videos.length === 0) return results;

  if (videos.length > 0) {
    for (const video of videos) {
      const tempUser = await User.findById(
        video.userId,
        "username profile subscribers"
      ).exec();
      const { _id, ...user } = tempUser._doc;
      results.push({ ...video, ...user });
    }
    return results;
  }
};
