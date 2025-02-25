import mongoose from "mongoose"
import { Playlist } from "../models/playlist.model.js"
import { Video } from "../models/video.model.js"
import ApiError from "../utils/ApiError.js"
import ApiResponse from "../utils/ApiResponse.js"
import asyncHandler from "../utils/asyncHandler.js"

const createPlaylist = asyncHandler(async (req, res) => {

    const { name, description } = req.body

    if (!name || !description) {
        throw new ApiError(400, "Name and description are required");
    }

    const playlist = await Playlist.create({
        name,
        description,
        owner: req.user?._id,
    })

    if (!playlist) {
        throw new ApiError(500, "Failed to create playlist");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, playlist, "Playlist successfully created"))
})

const getUserPlaylists = asyncHandler(async (req, res) => {

    const { userId } = req.params

    // TODO: get user playlists
})

const getPlaylistById = asyncHandler(async (req, res) => {

    const { playlistId } = req.params

    // TODO: get playlist by id
})

const addVideoToPlaylist = asyncHandler(async (req, res) => {

    const { playlistId, videoId } = req.params

    if (!mongoose.isValidObjectId(playlistId) || !mongoose.isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid playlist Id or video Id");
    }

    const playlist = await Playlist.findById(playlistId);
    const video = await Video.findById(videoId);

    if (!video) {
        throw new ApiError(404, "Video not found");
    }

    if (!playlist) {
        throw new ApiError(404, "Playlist not found");
    }

    if (playlist.owner.toString() !== req.user?._id.toString()) {
        throw new ApiError(400, "Only owner can add video to their playlist");
    }

    const updatedPlaylist = await Playlist.findByIdAndUpdate(
        playlist?._id,
        {
            $addToSet: {
                videos: videoId,
            },
        },
        { new: true }
    )

    if (!updatedPlaylist) {
        throw new ApiError(500, "Failed to add video to playlist, please try again");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, updatedPlaylist, "Video successfully added to playlist"))
})

const removeVideoFromPlaylist = asyncHandler(async (req, res) => {

    const { playlistId, videoId } = req.params

    if (!mongoose.isValidObjectId(playlistId) || !mongoose.isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid playlist Id or video Id")
    }

    const playlist = await Playlist.findById(playlistId);
    const video = await Video.findById(videoId);

    if (!video) {
        throw new ApiError(404, "Video not found");
    }

    if (!playlist) {
        throw new ApiError(404, "Playlist not found");
    }

    if (playlist.owner.toString() !== req.user?._id.toString()) {
        throw new ApiError(400, "Only owner can remove video from their playlist")
    }

    const updatedPlaylist = await Playlist.findByIdAndUpdate(
        playlist?._id,
        {
            $pull: {
                videos: videoId
            },
        },
        { new: true }
    )

    if (!updatePlaylist) {
        throw new ApiError(500, "Failed to remove video from playlist, please try again");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, updatedPlaylist, "Video successfully removed from playlist"))
})

const deletePlaylist = asyncHandler(async (req, res) => {

    const { playlistId } = req.params

    if (!mongoose.isValidObjectId(playlistId)) {
        throw new ApiError(400, "Invalid playlist ID");
    }

    const playlist = await Playlist.findById(playlistId);

    if (!playlist) {
        throw new ApiError(404, "Playlist not found");
    }

    if (playlist.owner.toString() !== req.user?._id.toString()) {
        throw new ApiError(400, "only owner can delete the playlist");
    }

    await Playlist.findByIdAndDelete(playlist?._id);

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Playlist successfully deleted"))
})

const updatePlaylist = asyncHandler(async (req, res) => {

    const { name, description } = req.body
    const { playlistId } = req.params

    if (!mongoose.isValidObjectId(playlistId)) {
        throw new ApiError(400, "Invalid playlist Id");
    }

    if (!name || !description) {
        throw new ApiError(400, "Name and description are required");
    }

    const playlist = await Playlist.findById(playlistId);

    if (!playlist) {
        throw new ApiError(404, "Playlist not found");
    }

    if (playlist.owner.toString() !== req.user?._id.toString()) {
        throw new ApiError(400, "only owner can edit the playlist");
    }

    const updatedPlaylist = Playlist.findByIdAndUpdate(
        playlist?._id,
        {
            $set: {
                name,
                description,
            },
        },
        { new: true }
    )

    return res
        .status(200)
        .json(new ApiResponse(200, updatedPlaylist, "Playlist successfully updated"))
})

export { createPlaylist, getUserPlaylists, getPlaylistById, addVideoToPlaylist, removeVideoFromPlaylist, deletePlaylist, updatePlaylist }