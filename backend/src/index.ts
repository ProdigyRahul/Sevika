import express from 'express'
import authRouter from 'routes/auth'
import "src/db/database"

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(authRouter)

app.listen(8080, () => {
    console.log('Sevika is running on http://localhost:8080')
})