
import { Express } from 'express'

const createRoutes = (app: Express): void => {
  app.get('/health', (_, resp) => {
    resp.status(200).json({ status: 'OK' })
  })
}

export {
  createRoutes
}
