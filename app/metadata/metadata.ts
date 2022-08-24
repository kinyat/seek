import { readFileSync } from 'fs'
import path from 'path'
import { increaseCount } from '../../repos/metadata'

const getLastGitCommitSHA = (): string => readFileSync(path.join(__dirname, 'gitsha'), { encoding: 'utf-8' }).trim()

export {
  getLastGitCommitSHA,
  increaseCount
}
