module.exports = function (error, req, res) {
    if (error) {
        const errorData = { message: '', multiple: false };

        if (['ValidationError', 'CastError'].includes(error.constructor.name)) {
            const { errors } = error;
            const messages = Object.keys(errors)
                .map(path => errors[path].properties.message);
            errorData.message = messages;
            errorData.multiple = true;
        } else {
            errorData.message = error.message;
            errorData.multiple = false;
        }

        // console.log(error.stack);

        res.status(error.statusCode ?? 500).json(errorData);
    }
}