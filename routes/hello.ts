import { Express } from 'express'
import { hello } from '../app/hello/hello'

const createRoutes = (app: Express): void => {
  app.get('/hello', (_, resp) => {
    resp.status(200).send(hello())
  })
}

export {
  createRoutes
}
