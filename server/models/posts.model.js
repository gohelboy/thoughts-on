const { Schema, default: mongoose } = require('mongoose');

const postSchema = new Schema({
    title: {
        type: String,
        unique: true,
    },
    picture: String,
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
    comments: [
        {
            commentedBy: { type: Schema.Types.ObjectId, ref: "User" },
            comments: [
                {
                    comment: String,
                    createdAt: { type: Date, default: Date.now }
                }
            ]
        }
    ],
    upVotes: {
        type: Number,
        default: 0
    },
    upVotedBy: [
        { user: { type: Schema.Types.ObjectId, ref: "User" } }
    ],
}, {
    timestamps: true,
});

const postModel = mongoose.model('Post', postSchema);
module.exports = postModel