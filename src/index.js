import app from './app.js'
import connectDB from './config/db.js'
import { PORT } from './config/config.js'

async function main() {
    try {
        await connectDB()
        app.listen(PORT, () => {
            console.log(`Server running in: http://localhost:${PORT}`);
            console.log(`Enviroment: ${process.env.NODE_ENV}`)
        });
    } catch (error) {
        console.error(error)
    }
}

main();



