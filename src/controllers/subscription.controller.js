import asyncHandler from "../utils/asyncHandler.js"

const toggleSubscription = asyncHandler(async (req, res) => {

    const { channelId } = req.params

    // TODO: toggle subscription
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