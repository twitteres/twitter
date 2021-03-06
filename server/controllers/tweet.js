const TweetModel = require("../database/models/tweetModel");

const createNewTweet = (req, res) => {
  const userId = req.token.userId;
  const { description, date } = req.body;

  const newTweet = new TweetModel({
    userId,
    description,
    date,
  });

  newTweet
    .save()
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "The tweet has been created successed",
        result,
      });
    })
    .catch((err) => {
      res.status(404).json({
        success: false,
        message: "Server err",
        err,
      });
    });
};

const updateTweet = (req, res) => {
  const tweetId = req.params.tweetId;
  const userId = req.token.userId;

  const { description } = req.body;

  TweetModel.findOneAndUpdate(
    { _id: tweetId, userId },
    { description },
    { new: true }
  )
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "The tweet has been Updated successed",
        result,
      });
    })
    .catch((err) => {
      res.status(409).json({
        success: false,
        message: "Erorr happend while Updated",
        err,
      });
    });
};

const deleteTweet = (req, res) => {
  const tweetId = req.params.tweetId;
  const userId = req.token.userId;

  TweetModel.findOneAndDelete({ _id: tweetId, userId })
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "The tweet has been deleted successed",
        result,
      });
    })
    .catch((err) => {
      res.status(404).json({
        success: false,
        message: "Erorr happend while Deleted",
        err,
      });
    });
};

const getAllTweets = (req, res) => {
  TweetModel.find({})
    .populate("userId", "username email name bio website")
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "All tweets",
        result,
      });
    })
    .catch((err) => {
      res.status(404).json({
        success: false,
        message: "Erorr happend while Get All tweets",
        err,
      });
    });
};

const getTweetsByUser = (req, res) => {
  const userId = req.params.userId;
  TweetModel.find({ userId })
    .populate("userId", "username email name bio website")
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "get user tweets",
        result,
      });
    })
    .catch((err) => {
      res.status(404).json({
        success: false,
        message: "Erorr happend while Get user tweets",
        err,
      });
    });
};

const getTweetsById = (req, res) => {
  const id = req.params.id;
  console.log(req.params.id);
  TweetModel.findById({ _id: id })
    .populate("userId", "username email name bio website")
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "get tweet by Id",
        result,
      });
    })
    .catch((err) => {
      res.status(404).json({
        success: false,
        message: "Erorr happend while Get tweet",
        err,
      });
    });
};
module.exports = {
  createNewTweet,
  updateTweet,
  deleteTweet,
  getAllTweets,
  getTweetsByUser,
  getTweetsById,
};
