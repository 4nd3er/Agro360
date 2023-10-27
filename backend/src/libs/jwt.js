import jwt from 'jsonwebtoken';

export function createToken(id) {
    return new Promise((resolve, reject) => {
        jwt.sign(
            id,
            process.env.SECRET_TOKEN,
            {
                expiresIn: "30d"
            },
            (err, token) => {
                if (err) reject(err);
                resolve(token);
            }
        )
    })
}