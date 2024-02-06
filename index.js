import app from './src/app.js'
import connectDB from './src/config/db.js'
import { PORT } from './src/config/config.js'

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



