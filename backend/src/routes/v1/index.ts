import { Router} from 'express'
import prizeRouter from '../../modules/prize/routes'

const router = Router()

router.use('/prizes', prizeRouter)

export default router