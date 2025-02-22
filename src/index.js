import dotenv from 'dotenv'
import app from './app.js'

dotenv.config({
    path: "./.env"
})

app.get('/', (req, res) => {
    res.send("Server is running")
})

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`\nServer is listening on ${PORT}`);
    console.log(`http://localhost:${PORT}`)
})