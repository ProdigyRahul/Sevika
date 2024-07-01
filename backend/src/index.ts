import express from 'express'

const app = express();

app.get('/', (req, res) => {
    res.send('Sevika');
})

app.listen(8000, () => {
    console.log('Sevika is running on http://localhost:8080')
})