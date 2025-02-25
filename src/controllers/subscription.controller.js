import mongoose from "mongoose"
import { Subscription } from "../models/subscription.model.js"
import ApiError from "../utils/ApiError.js"
import ApiResponse from "../utils/ApiResponse.js"
import asyncHandler from "../utils/asyncHandler.js"

const toggleSubscription = asyncHandler(async (req, res) => {

    const { channelId } = req.params

    if (!mongoose.isValidObjectId(channelId)) {
        throw new ApiError(400, "Invalid channel Id");
    }

    const isSubscribed = await Subscription.findOne({
        subscriber: req.user?._id,
        channel: channelId,
    })

    if (isSubscribed) {

        await Subscription.findByIdAndDelete(isSubscribed?._id);

        return res
            .status(200)
            .json(new ApiResponse(200, { subscribed: false }, "Unsubscribed successfully"))
    }

    await Subscription.create({
        subscriber: req.user?._id,
        channel: channelId,
    })

    return res
        .status(200)
        .json(new ApiResponse(200, { subscribed: true }, "Subscribed successfully"))
})

const getUserChannelSubscribers = asyncHandler(async (req, res) => {

    const { channelId } = req.params

    // TODO: return subscriber list of a channel
})

const getSubscribedChannels = asyncHandler(async (req, res) => {

    const { subscriberId } = req.params

    // TODO: return channel list to which user has subscribed
})

export { toggleSubscription, getUserChannelSubscribers, getSubscribedChannels }