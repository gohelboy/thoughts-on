const { follow, unfollow } = require("../controller/users.ctrl/follow");
const { searchUser, getUsername, checkUsernameAvailability, setUsername } = require("../controller/users.ctrl/user");
const { authGuard } = require("../middleware/auth");

const router = require("express").Router();

router.get("/get-username", authGuard, getUsername);
router.post("/username", authGuard, setUsername);

router.get('/check-username-availablity/:username', authGuard, checkUsernameAvailability)
router.get("/search/:keyword", authGuard, searchUser);

router.post("/follow", authGuard, follow);
router.post("/unfollow", authGuard, unfollow);

module.exports = router;