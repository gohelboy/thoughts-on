const { failedResponse, successResponse, successResponseWithData, internalServerError } = require("../../utils/response");
const userModal = require("../../models/users.model");
const bcrypt = require("bcrypt");
const { sendMail } = require("../../utils/helperFunction");
const { emailVerificationTemplate, forgetPasswordTemplate } = require("../../html/emailTemplates");
const jwt = require('jsonwebtoken');
const { findUserByEmail } = require("../../queries/user.query");
const userModel = require("../../models/users.model");
const SALT = 10;

exports.signup = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return failedResponse(res, "Please enter required information");

        const existingUser = await userModal.findOne({ email: email });
        if (existingUser?.isVerified) return failedResponse(res, "This email address already exists.");

        const hasedPassword = await bcrypt.hashSync(password, SALT);
        const newUser = await userModal({
            email: email,
            password: hasedPassword,
        });

        const payload = {
            email: email,
            active: false
        }
        await SendAccountVerificationLink(payload);

        await newUser.save();
        return successResponse(res, 'Account created');
    } catch (err) {
        internalServerError(res, err?.message)
    }
}

const SendAccountVerificationLink = async (payload) => {
    const activationToken = await jwt.sign(payload, process.env.JWT_SECRET)
    const activationLink = `http://localhost:5173/activate?authToken=${activationToken}`
    await sendMail(payload.email, 'Verify Your Email to Activate Thoughts On', emailVerificationTemplate(activationLink));
}

exports.activateUser = async (req, res) => {
    try {
        const { token } = req.params;
        if (!token) return failedResponse(res, 'Invalid activation token');
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) return failedResponse(res, 'token us expired!');
        const updated = await userModel.updateOne({ email: decoded.email }, { isVerified: true })
        if (updated.modifiedCount > 0) {
            const existingUser = await userModal.findOne({ email: decoded.email }, { email: 1, username: 1 })
            if (!existingUser) return failedResponse(res, 'User does not exist');
            console.log(existingUser)
            const payload = { id: existingUser._id, email: existingUser.email, username: existingUser?.username }
            const encodedUser = await jwt.sign(payload, process.env.JWT_SECRET)
            return successResponseWithData(res, encodedUser, 'Your account is verified')
        }
        else return failedResponse(res, 'something went wrong!');
    } catch (error) {
        return internalServerError(res, error?.message)
    }
}


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return failedResponse(res, "Please enter required information");

        const existUser = await userModal.findOne({ email: email, isVerified: true });
        if (!existUser) return failedResponse(res, "User does not exist with this email address.");

        const passwordMatched = bcrypt.compareSync(password, existUser.password)
        if (!passwordMatched) return failedResponse(res, "Incorrect password!");

        delete existUser.password;

        const payload = { id: existUser._id, email: existUser.email, username: existUser?.username }
        const token = await jwt.sign(payload, process.env.JWT_SECRET);
        successResponseWithData(res, token, "Logged in successfully.");
    } catch (err) {
        internalServerError(res, err?.message)
    }
}


exports.changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const { email } = req.user;
        if (!currentPassword || !newPassword) return failedResponse(res, 'Please enter required information.')
        const existingUser = findUserByEmail(email);
        if (existingUser) return failedResponse('invalid user')
        const decodedPassword = await bcrypt.compare(currentPassword.trim(), existingUser.password);
        if (!decodedPassword) return failedResponse("Incorrect current password!");
        const newEncodedPassword = await bcrypt.hash(newPassword, SALT);
        if (!newEncodedPassword) return failedResponse('Something went wrong! while chnaging password!')
        existingUser.password = newEncodedPassword;
        await existingUser.save();
        return successResponse(res, "password changed successfully")

    } catch (err) {
        return internalServerError(res, err?.message)
    }
}

exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) return failedResponse(res, 'Please enter email!')
        const existingUser = await findUserByEmail(email);
        if (!existingUser) return failedResponse(res, 'Account not found!')
        const payload = { email: existingUser.email, id: existingUser._id }
        const token = await jwt.sign(payload, process.env.JWT_SECRET);
        const link = `http://localhost:5173/reset-password?token=${token}`
        await sendMail(email, "Reset Your Password - Thoughts On ", forgetPasswordTemplate(link))
        return successResponse(res, `Reset password Link is sent to ${email}`)

    } catch (err) {
        internalServerError(res, err?.message)
    }
}

exports.resetPassword = async (req, res) => {
    try {
        const { newPassword } = req.body;
        const { token } = req.params
        if (!token) return failedResponse(res, 'Invalid Request!');

        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) return failedResponse(res, 'Invalid token!');

        const existingUser = await findUserByEmail(decoded.email);
        if (!existingUser) return failedResponse(res, 'The user you trying to change password is not available!')

        const samePassword = await bcrypt.compare(newPassword, existingUser.password);
        if (samePassword) return failedResponse(res, "Password is already in use! Please try different password!")

        const newHashedPassword = await bcrypt.hash(newPassword, SALT);
        existingUser.password = newHashedPassword
        await existingUser.save();
        return successResponse(res, "Password is changed successfully")

    } catch (err) {
        return internalServerError(res, err?.message)
    }
}