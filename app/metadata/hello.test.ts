import { getLastGitCommitSHA } from './metadata'

describe('metadata', () => {
  describe('getLastGitCommitSHA', () => {
    it('should return the stored gitsha', () => {
      expect(getLastGitCommitSHA()).toBe('123abc')
    })
  })
})
