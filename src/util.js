function parseError(err) {
    if (err instanceof Error) {
        // Generic error
        if (!err.errors) {
            err.errors = [err.message];
        } else {
            // Mongoose validation errors
            const error = new Error('Input validation error!');
            error.errors = Object.fromEntries(Object.values(err.errors).map(e => [e.path, e.message]));
            return error;
        }

        // TODO parse Mongoose validation error here
    } else if (Array.isArray(err)) {
        // Express-validator error array
        const error = new Error('Input validation error!');
        error.errors = Object.fromEntries(err.map(e => [e.path, e.msg]));
        return error;
    }
    return err;
}

module.exports = {
    parseError
};