import { Router} from 'express'
import * as StatusController from '../controllers/status.controller'

const router = Router()

router.route('/status')
  .get(StatusController.info)

export default router