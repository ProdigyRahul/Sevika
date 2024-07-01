import express from 'express'
import authRouter from 'routes/auth'

const app = express();

app.get('/', (req, res) => {
    res.send("<h1>Sevika</h1>");
})

app.use(authRouter)

app.listen(8080, () => {
    console.log('Sevika is running on http://localhost:8080')
})