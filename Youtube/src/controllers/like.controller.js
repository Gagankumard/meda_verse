import mongoose, { isValidObjectId } from "mongoose"
import { Like } from "../models/like.models.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"

const toggleVideoLike = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    //TODO: toggle like on video
    const like = await Like.findOneAndDelete({ likedBy: req?.user._id, video: videoId })
    const pipeline = [
        {
            $match: {
                video: new mongoose.Types.ObjectId(videoId)
            }
        },
        {
            $group: {
                _id: null,
                totalLikes: { $sum: 1 },
                likedByCurrentUser: {
                    $addToSet: {
                        $cond: {
                            if: { $eq: ["$likedBy", req.user?._id] },
                            then: "$likedBy",
                            else: null
                        }
                    }
                }
            }
        },
        {
            $project: {
                totalLikes: 1,
                likedByCurrentUser: {
                    $cond: {
                        if: { $in: [req.user?._id, "$likedByCurrentUser"] },
                        then: true,
                        else: false
                    }
                }
            }
        }
    ];

    if (like) {
        const likeStats = await Like.aggregate(pipeline)
        return res.status(201).json(new ApiResponse(201, likeStats, "Successfully unliked"))
    } else {
        const newLike = await Like.create({ likedBy: req?.user._id, video: videoId })
        const likeStats = await Like.aggregate(pipeline)

        return res.status(200).json(new ApiResponse(200, likeStats, "Successfully liked"))
    }
})

// const toggleCommentLike = asyncHandler(async (req, res) => {
//     const { commentId } = req.params
//     //TODO: toggle like on comment

// })

// const toggleTweetLike = asyncHandler(async (req, res) => {
//     const { tweetId } = req.params
//     //TODO: toggle like on tweet
// }
// )

const getLikedVideos = asyncHandler(async (req, res) => {
    //TODO: get all liked videos

})

export {
    // toggleCommentLike,
    // toggleTweetLike,
    toggleVideoLike,
    getLikedVideos
}