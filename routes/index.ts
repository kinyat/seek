import { Express } from 'express'
import { createRoutes as createHelloRoutes } from './hello'
import { createRoutes as createHealthRoutes } from './health'

const createRoutes = (app: Express): void => {
  createHelloRoutes(app)
  createHealthRoutes(app)
}

export {
  createRoutes
}
