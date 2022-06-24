import PostModel from "../models/Post.js";

export const getAll = async (req, res) => {
  try {
    const posts = await PostModel.find().populate("user").exec();
    res.json(posts);
  } catch (e) {
    res.status(500).json({
      message: "Не загрузить статьи",
    });
  }
};
export const getOne = async (req, res) => {
  try {
    const postId = req.params.id;
    PostModel.findOneAndUpdate(
      {
        _id: postId,
      },
      {
        $inc: { viewsCount: 1 },
      },
      {
        returnDocument: "after",
      },
      (err, doc) => {
        if (err) {
          return res.status(500).json({
            message: "Не удалось загрузить статью",
          });
        }
        if (!doc) {
          return res.status(404).json({
            message: "статья не найдена",
          });
        }
        return res.json(doc);
      }
    ).populate("user");
  } catch (e) {
    res.status(500).json({
      message: "Не удалось загрузить статью",
    });
  }
};
export const create = async (req, res) => {
  try {
    const doc = new PostModel({
      title: req.body.title,
      text: req.body.text,
      tags: req.body.tags,
      imageUrl: req.body.imageUrl,
      user: req.userId,
    });

    const post = await doc.save();
    res.json(post);
  } catch (e) {
    res.status(500).json({
      message: "Не удалось создать статью",
    });
  }
};
export const remove = async (req, res) => {
  try {
    const postId = req.params.id;
    PostModel.findOneAndRemove(
      {
        _id: postId,
      },
      (err, doc) => {
        if (err) {
          return res.status(500).json({
            message: "Не удалось загрузить статью",
          });
        }
        if (!doc) {
          return res.status(404).json({
            message: "статья не найдена",
          });
        }
        return res.json({
          success: true,
        });
      }
    );
  } catch (e) {}
};
export const update = async (req, res) => {
  try {
    const postId = req.params.id;
    await PostModel.updateOne(
      {
        _id: postId,
      },
      {
        title: req.body.title,
        text: req.body.text,
        tags: req.body.tags,
        imageUrl: req.body.imageUrl,
        user: req.userId,
      }
    );
    res.json({
      success: true,
    });
  } catch (e) {
    res.status(500).json({
      message: "Не удалось обновить статью",
    });
  }
};
export const getTags = async (req, res) => {
  try {
    const posts = await PostModel.find().limit(5).exec();
    const tags = posts
      .map((obj) => obj.tags)
      .flat()
      .slice(0, 5);
    res.json(tags);
  } catch (e) {
    res.status(500).json({
      message: "Не загрузить теги",
    });
  }
};
