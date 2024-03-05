const { default: mongoose } = require("mongoose");
const transport = require("./emailConfig");
const { failedResponse, internalServerError } = require("./response");

exports.isValidObjectId = (...ids) => {
    if (ids.length <= 0) throw new Error("pass id to check is valid or not!");
    const allValid = ids.every((id) => mongoose.Types.ObjectId.isValid(id));
    return allValid;
}

exports.sendMail = async (to, subject, html) => {
    await transport.sendMail({
        to: to,
        subject: subject,
        html: html,
    })
    console.log(`email sent successfully to ${to}`)
}