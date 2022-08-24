import { Express } from 'express'
import { hello } from '../app/hello/hello'
import { getLastGitCommitSHA } from '../app/meta/meta'

interface IMetadataResponse {
  gitsha: string
}

const createRoutes = (app: Express): void => {
  app.get('/metadata', (_, resp) => {
    const respBody: IMetadataResponse = {
      gitsha: getLastGitCommitSHA()
    }
    resp.status(200).json(respBody)
  })
}

export {
  createRoutes
}
