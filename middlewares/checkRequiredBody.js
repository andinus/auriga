// Takes required fields & checks if they were passed or not. It is a
// configurable middleware.
const checkRequiredBody = (requiredFields) => {
    return async (req, res, next) => {
        for (const f of requiredFields)
            if (req.body[f] === undefined)
                return res.status(400).json({message: `Required field not passed: ${f}`});

        next();
    }
};

export default checkRequiredBody;
