import jwt from 'jsonwebtoken'

const validateToken = (req, res, next) => {
    const { token } = req.cookies

    if (!token) return res.status(401).json({ msg: "No token, authorization denied" });

    jwt.verify(token, process.env.SECRET_TOKEN, (err, user) => {
        if (err) return res.status(403).json({ msg: "Invalid token" });
        req.user = user;
        next();
    })
}

export default validateToken