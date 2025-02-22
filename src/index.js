import dotenv from 'dotenv'
import app from './app.js'
import connectDB from './db/connect.js'

dotenv.config({
    path: "./.env"
})

app.get('/', (req, res) => {
    res.send("Server is running")
})

const PORT = process.env.PORT || 8000;

connectDB()
    .then(() => {
        app.on("error", (err) => {
            console.log("ERROR: ", err);
            throw err;
        });

        app.listen(PORT, () => {
            console.log(`\nServer is running at ${PORT}`);
            console.log(`http://localhost:${PORT}`)
        })
    })
    .catch((err) => {
        console.log("MONGODB connection failed !! ", err);
    })