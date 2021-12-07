import { Router} from 'express'
import prizeRoutes from '../../modules/prize/routes'

const router = Router()

router.use('/prizes', prizeRoutes)

export default router