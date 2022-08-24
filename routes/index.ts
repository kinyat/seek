import { Express } from 'express'
import { createRoutes as createHelloRoutes } from './hello'
import { createRoutes as createHealthRoutes } from './health'
import { createRoutes as createMetadataRoutes } from './metadata'

const createRoutes = (app: Express): void => {
  createHelloRoutes(app)
  createHealthRoutes(app)
  createMetadataRoutes(app)
}

export {
  createRoutes
}
