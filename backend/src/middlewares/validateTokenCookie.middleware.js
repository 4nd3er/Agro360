import jwt from 'jsonwebtoken'

const validateToken = (req, res, next) => {
    // !Cambio temporal mientras esta listo el login
    /* const { token } = req.cookies

    if (!token) return res.status(401).json({ msg: "No token, authorization denied" });

    jwt.verify(token, process.env.SECRET_TOKEN, (err, admin) => {
        if (err) return res.status(403).json({ msg: "Invalid token" });
        req.admin = admin;
        next();
    })*/
    next();
}

export default validateToken