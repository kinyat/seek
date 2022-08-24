import 'dotenv/config'
import './models'
import express from 'express'
import { createRoutes } from './routes'
import { umzug } from './migrator'

void (async () => {
  // make sure database is always up-to-date
  // in real world scenario this process usually will either
  //   1. run in CI/CD
  //   2. triggered by helm hook and run as a job
  await umzug.up()

  const app = express()
  const port = 3333

  createRoutes(app)

  app.listen(port, () => {
    console.log(`server is running on port ${port}`)
  })
})()
