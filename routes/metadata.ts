import { Express } from 'express'
import { getLastGitCommitSHA, increaseCount } from '../app/metadata/metadata'

interface IMetadataResponse {
  gitsha: string
  count: unknown
}

const createRoutes = (app: Express): void => {
  app.get('/metadata', (_, resp) => {
    void (async () => {
      const respBody: IMetadataResponse = {
        gitsha: getLastGitCommitSHA(),
        count: await increaseCount()
      }
      resp.status(200).json(respBody)
    })()
  })
}

export {
  createRoutes
}
