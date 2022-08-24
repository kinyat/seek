import { readFileSync } from "fs"
import path from "path"

const getLastGitCommitSHA = (): string => readFileSync(path.join(__dirname, "gitsha"), { encoding: 'utf-8'}).trim()

export {
  getLastGitCommitSHA
}
