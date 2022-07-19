import { Router } from 'express'
import prizeRoutes from '../modules/prize/routes'
import cursosRoutes from '../modules/cursos/routes'

const router = Router()

router.use('/prizes', prizeRoutes)
router.use('/cursos', cursosRoutes)

export default router