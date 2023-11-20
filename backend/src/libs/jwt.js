import jwt from 'jsonwebtoken';

function createToken(data) {
    const { id, expires } = data

    const create = new Promise((resolve, reject) => {
        jwt.sign(
            { id: id },
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

    return create
}

export default createToken