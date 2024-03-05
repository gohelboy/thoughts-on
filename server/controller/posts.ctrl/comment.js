const { findUserById } = require("../../queries/user.query");
const { isValidObjectId } = require("../../utils/helperFunction")
const { findPostById, findUsersComments } = require("../../queries/post.query");
const { failedResponse, successResponse, internalServerError } = require("../../utils/response");

exports.addComment = async (req, res) => {
    try {
        const { comment, commentedBy } = req.body;
        const { postId } = req.params;
        if (!postId || !comment || !commentedBy) return failedResponse(res, "please enter required information!")
        const valid = isValidObjectId(postId, commentedBy);
        if (!valid) return failedResponse(res, "ids not valid!")

        const post = await findPostById(postId);
        if (!post) return failedResponse(res, "post is unavailable");

        const userComment = await findUsersComments(post, commentedBy)
        if (userComment) {
            userComment.comments.push({ comment: comment });
        } else {
            const newComment = {
                commentedBy: commentedBy,
                comments: [{ comment: comment }]
            };
            post.comments.push(newComment);
        }
        await post.save();

        return successResponse(res, "comment added");
    } catch (err) {
        internalServerError(res, err?.message);
    }
}

exports.deleteComment = async (req, res) => {
    try {
        const { commentId, commentedBy } = req.body;
        const { postId } = req.params;

        if (!postId || !commentId || !commentedBy) return failedResponse(res, "please enter required information!");

        const valid = isValidObjectId(commentedBy, postId, commentId);
        if (!valid) return failedResponse(res, "ids not valid!");

        const existUser = await findUserById(commentedBy);
        if (!existUser) return failedResponse(res, 'user who commented does not exists')

        const post = await findPostById(postId);
        if (!post) return failedResponse(res, "post is unavailable");

        const usersComments = await findUsersComments(post, commentedBy);
        if (usersComments.length <= 0) return failedResponse(res, "users comments didn't found!");

        const userCommentIndex = await usersComments.findIndex((comment) => comment._id.toString() === commentId);
        if (userCommentIndex < 0) return failedResponse(res, "comment already deleted!");
        await usersComments.splice(userCommentIndex, 1);
        post.save();

        return successResponse(res, "comment deleted successfully");
    } catch (err) {
        return internalServerError(res, err);
    }
}