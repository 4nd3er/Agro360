import jwt from 'jsonwebtoken'

const validateToken = (req, res, next) => {
    const { token } = req.params

    if (!token) return res.status(401).json({ message: ["No token, authorization denied"] });

    jwt.verify(token, process.env.SECRET_TOKEN, (err, user) => {
        if (err) return res.status(403).json({ message: ["Invalid token"] });
        req.user = user;
        next();
    })
}

export default validateToken