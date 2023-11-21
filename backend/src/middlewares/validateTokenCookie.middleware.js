import jwt from 'jsonwebtoken'

const validateToken = (req, res, next) => {
    const { token } = req.cookies

    if (!token) return res.status(401).json({ message: ["No token, authorization denied"] });

    jwt.verify(token, process.env.SECRET_TOKEN, (err, admin) => {
        if (err) return res.status(403).json({ message: ["Invalid token"] });
        req.admin = admin;
        next();
    })
}

export default validateToken