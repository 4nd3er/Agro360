const validate = (validator, type) => (req, res, next) => {
    try {
        type == "query" ? validator.parse(req.query) : validator.parse(req.body)
        next()
    } catch (error) {
        return res.status(400).json({ message: error.errors.map(err => err.message) });
    }
}

export default validate