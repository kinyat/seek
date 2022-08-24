import { Express } from 'express'
import { createRoutes as createHelloRoutes } from './hello'
import { createRoutes as createHealthRoutes } from './health'
import { createRoutes as createMetadataRoutes } from './metadata'
import { createRoutes as createCalculateRoutes } from './calculate'

const createRoutes = (app: Express): void => {
  createHelloRoutes(app)
  createHealthRoutes(app)
  createMetadataRoutes(app)
  createCalculateRoutes(app)
}

export {
  createRoutes
}
