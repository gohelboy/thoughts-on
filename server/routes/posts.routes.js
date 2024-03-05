const { addComment, deleteComment } = require("../controller/posts.ctrl/comment");
const { createPost, deletePost, getAllUserPosts, getPostsAllComments } = require("../controller/posts.ctrl/posts");
const { upVote } = require("../controller/posts.ctrl/vote.");
const { authGuard } = require("../middleware/auth");

const router = require("express").Router();

router.get("/:userId", authGuard, getAllUserPosts);
router.post('/create', authGuard, createPost);
router.delete('/:postId', authGuard, deletePost);

router.post("/upvote/:postId", authGuard, upVote);

router.get("/comment/:postId", authGuard, getPostsAllComments);
router.post("/comment/:postId/add", authGuard, addComment);
router.delete("/comment/:postId", authGuard, deleteComment);

module.exports = router;