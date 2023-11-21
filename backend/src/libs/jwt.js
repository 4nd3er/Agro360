import jwt from 'jsonwebtoken';

function createToken(data) {

    const { id, expires } = data
    return new Promise((resolve, reject) => {
        jwt.sign(
            { id: id},
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

export default createToken