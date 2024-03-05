const postModel = require("../models/posts.model")

exports.getAllUsersPostDB = async (userId) => {
    if (!userId) throw new Error("post id is required to find posts!");
    return await postModel.find({ createdBy: userId }, { comments: 0, upVotedBy: 0 })
}

exports.findPostById = async (postId) => {
    if (!postId) throw new Error("post id is required to find post!");
    return await postModel.findById(postId);
}

exports.getPostByTitle = async (title) => {
    if (!title) throw new Error("title is required to find a post!")
    return await postModel.findOne({ title: title.trim() })
}

exports.findUsersComments = async (post, commentById) => {
    if (!post || !commentById) throw new Error("post or commentById is required to find a users comment!")
    return await post.comments.map((user) => { if (user.commentedBy.toString() === commentById) return user.comments })[0];
}

exports.getPostsAllCommentsDB = async (postId) => {
    if (!postId) throw new Error("post id is required to get comments")
    return await postModel.findById(postId, { comments: 1 });
} 