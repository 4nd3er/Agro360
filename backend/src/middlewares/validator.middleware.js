const validate = (validator) => (req, res, next) => {
    try {
        validator.parse(req.body)
        next()
    } catch (error) {
        return res.status(400).json({ error: error.errors.map(err => err.message) });
    }
}

export default validate