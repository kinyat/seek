
import { Express } from 'express'
import { calculateSuggestedResources } from '../app/calculate/calculate'

interface ICalculateRequest {
  app: string
  time: string
  'cpu usage (mcores)': number
  'memory usage (MiB)': number
}

const createRoutes = (app: Express): void => {
  app.post('/calculate', (req, resp) => {
    try {
      if (!Array.isArray(req.body)) {
        throw new Error('invalid request')
      }

      const result = calculateSuggestedResources(req.body)

      resp.status(200).json(result)
    } catch (e) {
      resp.status(400).json({
        error: (e as Error).message
      })
    }
  })
}

export {
  ICalculateRequest,
  createRoutes
}
