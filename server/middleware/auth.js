const userModel = require("../models/users.model");
const { internalServerError, failedResponse } = require("../utils/response");
const jwt = require('jsonwebtoken');

exports.authGuard = async (req, res, next) => {
    try {
        if (req.headers && req.headers.token) {
            const token = req.headers.token
            const decoded = await jwt.verify(token, process.env.JWT_SECRET);
            const existingUser = await userModel.findOne({ email: decoded.email })
            if (!existingUser) return failedResponse(res, 'invalid user token');
            if (existingUser.lasPasswordChangedAt && decoded.iat > existingUser.lasPasswordChangedAt) return failedResponse(res, 'Token expired due to password change')
            delete existingUser.password
            req.user = existingUser;
            next();
        }
    } catch (err) {
        return internalServerError(res, err?.message);
    }
}