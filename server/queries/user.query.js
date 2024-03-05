const userModel = require('../models/users.model');

exports.findUserById = async (userId) => {
    if (!userId) throw new Error("User id is required to find a user.");
    return await userModel.findById(userId);
}

exports.findUserByEmail = async (email) => {
    if (!email) throw new Error("email id is required to find a user.");
    return await userModel.findOne({ email: email });
}

exports.getUsersAllFollowers = async (userId) => {
    if (!userId) throw new Error("User id is required to find a user.");
    return await userModel.findById(userId, { followerCount: 1, followers: 1 });
}


