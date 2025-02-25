import mongoose, { mongo } from "mongoose"
import { User } from "../models/user.model.js"
import { Tweet } from "../models/tweet.model.js"
import ApiError from "../utils/ApiError.js"
import ApiResponse from "../utils/ApiResponse.js"
import asyncHandler from "../utils/asyncHandler.js"

const createTweet = asyncHandler(async (req, res) => {

    const { content } = req.body

    if (!content) {
        throw new ApiError(400, "content is required");
    }

    const tweet = await Tweet.create({
        content,
        owner: req.user?._id,
    })

    if (!tweet) {
        throw new ApiError(500, "Failed to create tweet, please try again");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, tweet, "Tweet successfully created"))
})

const getUserTweets = asyncHandler(async (req, res) => {
    // TODO: get user tweets
})

const updateTweet = asyncHandler(async (req, res) => {

    const { content } = req.body
    const { tweetId } = req.params

    if (!mongoose.isValidObjectId(tweetId)) {
        throw new ApiError(400, "Invalid tweet Id");
    }

    if (!content) {
        throw new ApiError(400, "Content is required");
    }

    const tweet = await Tweet.findById(tweetId);

    if (!tweet) {
        throw new ApiError(404, "Tweet not found");
    }

    if (tweet.owner.toString() !== req.user?._id.toString()) {
        throw new ApiError(400, "Only owner can edit thier tweet")
    }

    const updatedTweet = await Tweet.findByIdAndUpdate(
        tweetId,
        {
            $set: {
                content,
            },
        },
        { new: true }
    )

    if (!updatedTweet) {
        throw new ApiError(500, "Failed to edit tweet, please try again");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, updatedTweet, "Tweet successfully updated"))
})

const deleteTweet = asyncHandler(async (req, res) => {

    const { tweetId } = req.params

    if (!mongoose.isValidObjectId(tweetId)) {
        throw new ApiError(400, "Invalid tweet Id");
    }

    const tweet = await Tweet.findById(tweetId);

    if (tweet.owner.toString() !== req.user?._id.toString()) {
        throw new ApiError(400, "Only owner can delete thier tweet");
    }

    await Tweet.findByIdAndDelete(tweetId);

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Tweet successfully deleted"))
})

export { createTweet, getUserTweets, updateTweet, deleteTweet }