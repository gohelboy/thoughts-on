const router = require("express").Router();
const { signup, login, activateUser, resetPassword, forgotPassword, changePassword } = require('../controller/users.ctrl/auth');
const { authGuard } = require("../middleware/auth");

router.post("/signup", signup);
router.get('/activate/:token', activateUser);
router.post("/login", login);

router.post('/change-password', authGuard, changePassword);

router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);

module.exports = router;
