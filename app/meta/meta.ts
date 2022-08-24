import { readFileSync } from 'fs'
import path from 'path'
import { increaseCount } from '../../models/metadata'

const getLastGitCommitSHA = (): string => readFileSync(path.join(__dirname, 'gitsha'), { encoding: 'utf-8' }).trim()

export {
  getLastGitCommitSHA,
  increaseCount
}
