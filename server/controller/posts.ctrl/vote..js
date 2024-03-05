const { findPostById } = require("../../queries/post.query");
const { internalServerError, failedResponse, successResponse } = require("../../utils/response")

exports.upVote = async (req, res) => {
    try {
        const { userId } = req.user.id;
        const { postId } = req.params;
        if (!userId || !postId) return failedResponse(res, 'Please enter required information');

        const valid = isValidObjectId(userId, postId);
        if (!valid) return failedResponse(res, "id not valid!")

        const existUser = await findUserById(userId);
        if (!existUser) return failedResponse(res, "user not exist!");

        const existPost = await findPostById(postId);
        if (!existPost) return failedResponse(res, "Post does not exist");

        const { alreadyUpVoted, upVotedIndex } = await findIfUserAlreadyUpVoted(existPost, userId)
        if (!alreadyUpVoted) {
            addUpVote(existPost, userId)
        } else {
            removeUpVote(existPost, userId, upVotedIndex)
        }
        await existPost.save();

        const responseMessage = alreadyUpVoted ? "upvote removed successfully" : "upvoted successfully";
        successResponse(res, responseMessage);
    } catch (err) {
        internalServerError(res, err?.message)
    }
}

const findIfUserAlreadyUpVoted = async (existPost = {}, userId) => {
    if (!userId) return
    const upVotedIndex = await existPost.upVotedBy.findIndex((users) => users.id === userId);
    return { alreadyUpVoted: upVotedIndex !== -1, upVotedIndex };
}

const addUpVote = (existPost = {}, userId) => {
    if (!userId) return
    existPost.upVotedBy.push(userId);
    existPost.upVotes++;
}
const removeUpVote = (existPost = {}, upVotedIndex) => {
    if (upVotedIndex === -1) return
    existPost.upVotedBy.splice(upVotedIndex, 1);
    existPost.upVotes = Math.max(existPost.upVotes - 1, 0);
}