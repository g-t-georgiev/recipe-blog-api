module.exports = function (error, req, res, next) {
    if (error) {
        const errorData = { message: '', multiple: false };

        if (['ValidationError'].includes(error.constructor.name)) {
            errorData.multiple = Object.keys(error).length > 1;
            const { errors } = error;

            if (['ValidatorError', 'CastError'].includes(errors[path].constructor.name)) {
                let messages = [];

                for (const path in errors) {
                    messages.push(errors[path].properties.message);
                }

                errorData.message = messages.join(' ');
            }
        } else {
            errorData.message = error.message;
        }

        res.status(error.statusCode ?? 500).json(errorData);
    }
}