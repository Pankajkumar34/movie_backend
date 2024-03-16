const customError = (req, res, err) => {
    const errorData = {
        status: err.status || false,
        statusCode: err.statusCode || 500,
        message: err.message || "Something went wrong"
    };
    return res.status(err.statusCode).json(errorData);
};

module.exports = customError;
