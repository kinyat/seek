import express from 'express'
import { createRoutes } from './routes'

const app = express()
const port = 3333

createRoutes(app)

app.listen(port, () => {
  console.log(`Timezones by location application is running on port ${port}.`)
})
