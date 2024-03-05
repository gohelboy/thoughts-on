exports.successResponse = (res, message = "") => {
    res.status(200).json({
        status: true,
        message: message,
    })
}
exports.successResponseWithData = (res, data, message = "") => {
    res.status(200).json({
        status: true,
        message: message,
        data: data
    })
};
exports.failedResponse = (res, message = "") => {
    res.status(404).json({
        status: false,
        message: message,
    })
};
exports.internalServerError = (res, error) => {
    res.status(501).json({
        status: false,
        message: error
    })
};