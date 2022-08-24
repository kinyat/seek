import { Express } from 'express'
import { hello } from '../app/hello/hello'
import { getLastGitCommitSHA, increaseCount } from '../app/meta/meta'

interface IMetadataResponse {
  gitsha: string
  count: unknown
}

const createRoutes = (app: Express): void => {
  app.get('/metadata', async (_, resp) => {
    const respBody: IMetadataResponse = {
      gitsha: getLastGitCommitSHA(),
      count: await increaseCount()
    }
    resp.status(200).json(respBody)
  })
}

export {
  createRoutes
}
