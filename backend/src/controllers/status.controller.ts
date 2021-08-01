import * as Service from '../services/info.service'

export const info = (req, res): void => {
  res.status(200).json(Service.info())
}