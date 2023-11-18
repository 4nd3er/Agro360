import app from './app.js'
import connectDB from './config/db.js'
import cors from 'cors'

connectDB()

const PORT = process.env.PORT


//Configuracion del CORS
const whitelist = ["http://localhost:5173"]

const corsOptions = {
    origin: function(origin, callback){
        if (whitelist.includes(origin)) {

            callback(null,true)
        }else{

            callback(new Error("Eror gravisisimo"))
        }
    }
}



app.listen(PORT, () => {
    console.log(`Server running in: http://localhost:${PORT}`);
});