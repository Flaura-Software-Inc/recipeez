import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()

const app = express()
app.use(cors())
const port = process.env.PORT

app.get('/', (_, res) => {
    res.send('Express + Typescript Server')
})

app.get('/test', (_, res) => {
    res.send({data: 'bing bong'})
})

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`)
})