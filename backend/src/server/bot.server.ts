import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import V1Routes from '../routes'

export default class Server {
    private app: express.Application
    public port: number
    public storage: any

    constructor(port) {
        this.app = express()
        this.app.use(bodyParser.json())
        this.app.use(bodyParser.urlencoded({ extended: true }))
        this.app.use(cors())
        this.port = port
    }
    route = () => {
        this.app.use('/v1', V1Routes)
    }
    listen = () => {
        this.app.listen(this.port, () => console.log(`Server running on port ${this.port}`))
    }
}