import mongoose from "mongoose"
import { Like } from "../models/like.model.js"
import ApiError from "../utils/ApiError.js"
import ApiResponse from "../utils/ApiResponse.js"
import asyncHandler from "../utils/asyncHandler.js"

const toggleVideoLike = asyncHandler(async (req, res) => {

    const { videoId } = req.params

    if (!mongoose.isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid video Id");
    }

    const likedAlready = await Like.findOne({
        video: videoId,
        likedBy: req.user?._id,
    });

    if (likedAlready) {

        await Like.findByIdAndUpdate(likedAlready?._id);

        return res
            .status(200)
            .json(new ApiResponse(200, { isLiked: false }, "Video is unliked"))
    }

    await Like.create({
        video: videoId,
        likedBy: req.user?._id,
    });

    return res
        .status(200)
        .json(new ApiResponse(200, { isLiked: true }, "Video is liked"))
})

const toggleCommentLike = asyncHandler(async (req, res) => {

    const { commentId } = req.params

    if (!mongoose.isValidObjectId(commentId)) {
        throw new ApiError(400, "Invalid comment Id");
    }

    const likedAlready = await Like.findOne({
        comment: commentId,
        likedBy: req.user?._id,
    });

    if (likedAlready) {

        await Like.findByIdAndUpdate(likedAlready?._id);

        return res
            .status(200)
            .json(new ApiResponse(200, { isLiked: false }, "Comment is unliked"))
    }

    await Like.create({
        comment: commentId,
        likedBy: req.user?._id,
    });

    return res
        .status(200)
        .json(new ApiResponse(200, { isLiked: true }, "Comment is liked"))
})

const toggleTweetLike = asyncHandler(async (req, res) => {

    const { tweetId } = req.params

    if (!mongoose.isValidObjectId(tweetId)) {
        throw new ApiError(400, "Invalid tweet Id");
    }

    const likedAlready = await Like.findOne({
        tweet: tweetId,
        likedBy: req.user?._id,
    });

    if (likedAlready) {

        await Like.findByIdAndUpdate(likedAlready?._id);

        return res
            .status(200)
            .json(new ApiResponse(200, { isLiked: false }, "Tweet is unliked"))
    }

    await Like.create({
        tweet: tweetId,
        likedBy: req.user?._id,
    });

    return res
        .status(200)
        .json(new ApiResponse(200, { isLiked: true }, "Tweet is liked"))
})

const getLikedVideos = asyncHandler(async (req, res) => {
    // TODO: get all liked videos
})

export { toggleCommentLike, toggleTweetLike, toggleVideoLike, getLikedVideos }