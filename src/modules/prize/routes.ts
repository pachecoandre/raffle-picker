import { Router } from 'express'
import Prize from './model'

const prizeRouter = Router()

prizeRouter.get('/', async (req, res) => {
    const prizes = await Prize.find()
    res.send(prizes)
})

prizeRouter.post('/', async (req, res) => {
    const prize = new Prize({
        name: req.body.name,
        description: req.body.description
    })
    const { _id } = await prize.save()
    res.status(200).send({ _id })
})

export default prizeRouter
