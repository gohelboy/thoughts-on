const postModel = require("../../models/posts.model");
const { getPostByTitle, findPostById, getAllUsersPostDB, getPostsAllCommentsDB } = require("../../queries/post.query");
const { findUserById } = require("../../queries/user.query");
const { isValidObjectId } = require("../../utils/helperFunction");
const { internalServerError, failedResponse, successResponseWithData, successResponse } = require("../../utils/response")

exports.getAllUserPosts = async (req, res) => {
    const { userId } = req.params;
    if (!userId) return failedResponse(res, "please enter required information");

    const valid = isValidObjectId(userId);
    if (!valid) return failedResponse(res, "id not valid!");

    const usersPosts = await getAllUsersPostDB(userId)
    return successResponseWithData(res, usersPosts, "posts")
}

exports.getPostsAllComments = async (req, res) => {
    const { postId } = req.params;
    if (!postId) return failedResponse(res, "please enter required information");

    const valid = isValidObjectId(postId);

    if (!valid) return failedResponse(res, "id not valid!");
    const comments = await getPostsAllCommentsDB(postId);

    successResponseWithData(res, comments, "comments");
}

exports.createPost = async (req, res) => {
    try {
        const { title, picture } = req.body;
        if (!title || !picture) return failedResponse(res, 'Please enter required information!');

        const existPostWithTitle = await getPostByTitle(title);
        if (existPostWithTitle) return failedResponse(res, `Post is already exist with this "${title}" title.`);

        const newPost = await postModel({
            title: title.trim(),
            picture: picture.trim(),
            createdBy: req.user.id,
        })
        await newPost.save();

        successResponseWithData(res, newPost, "post created successfully.")
    } catch (err) {
        internalServerError(res, err?.message)
    }
}

exports.deletePost = async (req, res) => {
    try {
        const { postId } = req.params;
        const userId = req.user.id;
        if (!postId || !userId) return failedResponse(res, "Please enter required infromation!");

        const valid = isValidObjectId(userId, postId);
        if (!valid) return failedResponse(res, "ids not valid!")

        const existUser = await findUserById(userId);
        if (!existUser) return failedResponse(res, "user not exist!");

        const post = await findPostById(postId);
        if (!post) return failedResponse(res, "post unavailable");
        if (post.createdBy.toString() !== userId) return failedResponse(res, "Action denied");

        await post.deleteOne()
        return successResponse(res, "post deleted successfully");

    } catch (err) {
        return internalServerError(res, err?.message);
    }
}

