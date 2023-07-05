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
        "username profile"
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

export const getVideo = async (req, res, next) => {
  try {
    const video = await Video.findOneAndUpdate(
      { _id: req.params.id },
      { $inc: { views: 1 } },
      { new: true }
    );

    const tempUser = await User.findById(
      video.userId,
      "username profile"
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

export const random = async (req, res, next) => {
  try {
    const videos = await Video.aggregate([
      { $match: { isShort: false } },
      { $sample: { size: 40 } },
    ]);
    if (videos) {
      let results = [];
      for (const video of videos) {
        const tempUser = await User.findById(
          video.userId,
          "username profile"
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

export const getShorts = async (req, res, next) => {
  try {
    const videos = await Video.aggregate([
      { $match: { isShort: true } },
      { $sample: { size: 40 } },
    ]);
    if (videos) {
      let results = [];
      for (const video of videos) {
        const tempUser = await User.findById(
          video.userId,
          "username profile"
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

export const trend = async (req, res, next) => {
  try {
    const videos = await Video.find().sort({ views: -1 });
    if (videos) {
      let results = [];
      for (const video of videos) {
        const tempUser = await User.findById(
          video.userId,
          "username profile"
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
    const subscribedChannels = user.subscribedUsers;

    const list = await Promise.all(
      subscribedChannels.map(async (channelId) => {
        let results = [];
        const tempUser = await User.findById(
          channelId,
          "username profile"
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
          "username profile"
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
          "username profile"
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
