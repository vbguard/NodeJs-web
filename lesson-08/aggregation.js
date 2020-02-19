const Authors = require("./model/author.model");
const Posts = require("./model/posts.model");
const { ObjectId } = require("mongoose").Types;

// Author => many to one => Posts
const createAuthor = async (req, res) => {
  const newAuthorData = req.body;
  try {
    const newAuthor = await new Authors(newAuthorData);
    const result = await newAuthor.save();
    sendResult(result, res);
  } catch (error) {
    sendError(error, res);
  }
};

const createPost = async (req, res) => {
  try {
    const newPostData = req.body;

    const newPost = await Posts.create(newPostData);

    const updatedAuthor = await Authors.findOneAndUpdate(
      { _id: ObjectId(newPostData.author) },
      { $push: { posts: newPost._id } },
      { new: true, upsert: true }
    );

    if (updatedAuthor) {
      sendResult(newPost, res);
    } else {
      sendError("authior not found", res);
    }
  } catch (error) {
    sendError(error, res);
  }
};

// Author => one to many => Posts
const getPostsByAuthorInPosts = async (req, res) => {
  const { authorId, page, limit } = req.query;

  const options = {
    page: page || 1,
    limit: limit || 10,
    populate: { path: "author", select: { posts: 0 } }
  };

  try {
    const posts = await Posts.paginate({ author: authorId }, options);
    //   .populate(
    //   "author",
    //   {
    //     name: 1
    //   }
    // );

    //   .select({ name: true })
    //   .skip(5)
    //   .limit(3)
    //   .sort({ createdAt: -1 });
    // const posts = await Posts.aggregate([
    //   {
    //     $match: { author: ObjectId(authorId) }
    //   },
    //   {
    //     $lookup: {
    //       from: "authors",
    //       localField: "author",
    //       foreignField: "_id",
    //       as: "author"
    //     }
    //   },
    //   {
    //     $project: {
    //       "author.createdAt": 0,
    //       "author.posts": 0,
    //       "author.__v": 0,
    //       __v: false
    //     }
    //   },
    //   {
    //     $unwind: "$author"
    //   }
    // ]);

    sendResult(posts, res);
  } catch (error) {
    console.log("error :", error);
    sendError(error, res);
  }
};
// Author => one to one => Post
const getPostsByAuthor = async (req, res) => {
  const { authorId } = req.query;

  try {
    const posts = await Authors.findOne({ _id: authorId })
      .populate("posts", { text: 1, createdAt: 1 })
      .select({ posts: 1 });

    // const posts = await Authors.aggregate([
    //   {
    //     $match: { _id: ObjectId(authorId) }
    //   },
    //   {
    //     $lookup: {
    //       from: "posts",
    //       localField: "posts",
    //       foreignField: "_id",
    //       as: "posts"
    //     }
    //   },
    //   {
    //     $project: {
    //       _id: 0,
    //       "posts.createTime": 0,
    //       "posts.__v": 0,
    //       name: 0,
    //       __v: false
    //     }
    //   }
    // ]);

    sendResult(posts, res);
  } catch (error) {
    console.log("error :", error);
    sendError(error, res);
  }
};

const aggregation = async (req, res) => {
  try {
    const posts = await Posts.find({});

    sendResult(posts, res);
  } catch (error) {
    sendError(error, res);
  }
};

const sendResult = (data, res) => {
  res.json({ result: data });
};

const sendError = (error, res) => {
  res.status(400).json({ error: error });
};

module.exports = {
  aggregation,
  createPost,
  createAuthor,
  getPostsByAuthor,
  getPostsByAuthorInPosts
};
