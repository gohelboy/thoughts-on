const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    lasPasswordChangedAt: { type: Date, default: null },
    isVerified: { type: Boolean, default: false },
    profilePicture: String,
    followerCount: { type: Number, default: 0 },
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    followingCount: { type: Number, default: 0 },
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
}, {
    timestamps: true,
});

usersSchema.pre('save', function (next) {
    if (this.isModified('password')) this.lasPasswordChangedAt = new Date();
    next();
})

const userModel = mongoose.model("User", usersSchema);

module.exports = userModel;
