const userModel = require("../../models/users.model");
const { failedResponse, successResponseWithData, internalServerError, successResponse } = require("../../utils/response");

exports.searchUser = async (req, res) => {
    try {
        const { keyword } = req.params;
        if (!keyword) return failedResponse(res, "please enter a keyword to search user");
        const regex = new RegExp(keyword, "i");
        const foundUsers = await userModel.find({ username: regex }, { username: 1, profilePicture: 1 }).limit(10);
        successResponseWithData(res, foundUsers, "found users");
    } catch (err) {
        internalServerError(res, err?.message);
    }
}

exports.getUsername = async (req, res) => {
    try {
        const currentUser = req.user;
        if (!currentUser) return failedResponse(res, "Invalid request!");
        const data = { username: currentUser.username ? true : false }
        return successResponseWithData(res, data, "username check");
    } catch (err) {
        internalServerError(res, err?.message);
    }
}


exports.checkUsernameAvailability = async (req, res) => {
    try {
        const { username } = req.params;
        if (!username) return failedResponse(res, "please enter a username");
        const alreadyAvailable = await userModel.findOne({ username: username })
        return successResponseWithData(res, { available: alreadyAvailable ? false : true });
    } catch (err) {
        return internalServerError(res, err?.message);
    }
}

exports.setUsername = async (req, res) => {
    try {
        const { username } = req.body;
        if (!username) return failedResponse(res, 'username is empty!');
        const usernameExists = await userModel.findOne({ username: username });
        if (usernameExists) return failedResponse(res, "username already taken!");
        const existingUser = await userModel.findById(req.user._id)
        if (!existingUser) return failedResponse(res, 'user does not exist!');
        existingUser.username = username.toLowerCase().trim();
        await existingUser.save();
        return successResponse(res, 'username has been set')

    } catch (err) {
        internalServerError(res, err?.message);
    }
}