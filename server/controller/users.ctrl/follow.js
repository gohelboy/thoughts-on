const { findUserById } = require("../../queries/user.query");
const { isValidObjectId } = require("../../utils/helperFunction");
const { failedResponse, successResponse, internalServerError } = require("../../utils/response");

exports.follow = async (req, res) => {
    try {
        const { userId, followingUserId } = req.body;
        if (!userId || !followingUserId) return failedResponse(res, "please enter required information");

        const valid = isValidObjectId(userId, followingUserId);
        if (!valid) return failedResponse(res, 'id must be a valid');

        const currentUser = await findUserById(userId);
        if (!currentUser) return failedResponse(res, "user not found");

        const followUser = await findUserById(followingUserId);
        if (!followUser) return failedResponse(res, "The user you trying to follow is not exist");

        const isAlreadyFollowing = currentUser.following.includes(followingUserId);
        const isAlreadyInFollower = followUser.followers.includes(currentUser._id);

        if (isAlreadyFollowing) return failedResponse(res, `You are already following ${followUser.username}`);
        if (isAlreadyInFollower) return failedResponse(res, "You are already in this users follower");

        currentUser.following.push(followUser._id);
        currentUser.followingCount++;

        followUser.followers.push(currentUser._id);
        followUser.followerCount++;

        await Promise.all([currentUser.save(), followUser.save()])
        return successResponse(res, `Your are now following ${followUser.username}`)
    } catch (err) {
        internalServerError(res, err);
    }
}

exports.unfollow = async (req, res) => {
    try {
        const { userId, unfollowerId } = req.body;
        if (!userId || !unfollowerId) return failedResponse(req, res);

        const valid = isValidObjectId(userId, unfollowerId);
        if (!valid) return failedResponse(res, "id must be a valid");

        const currentUser = await findUserById(userId);
        if (!currentUser) return failedResponse(res, "user not found");

        const unfollowUser = await findUserById(unfollowerId);
        if (!unfollowUser) return failedResponse(res, "The user you trying to unfollow is not exist");

        const followingIndex = currentUser.following.findIndex((user) => user.toString() === unfollowUser.id);
        const followerIndex = unfollowUser.followers.findIndex((user) => user.toString() === currentUser.id);

        if (followingIndex < 0) return failedResponse(res, "you trying to unfollow the user that is not on your follower list, refresh!");
        if (followerIndex < 0) return failedResponse(res, "You are not in the following list og this user");

        currentUser.following.splice(followingIndex, 1);
        currentUser.followingCount = Math.max(currentUser.followingCount - 1, 0)

        unfollowUser.followers.splice(followerIndex, 1);
        unfollowUser.followerCount = Math.max(unfollowUser.followerCount - 1, 0)

        await Promise.all([currentUser.save(), unfollowUser.save()])

        return successResponse(res, `You unfollowed ${unfollowUser.username}`)

    } catch (err) {
        internalServerError(res, err?.message);
    }
}
