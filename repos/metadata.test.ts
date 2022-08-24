import { Metadata } from '../models/metadata'
import { increaseCount } from './metadata'

jest.mock('../models/metadata', () => {
  return {
    Metadata: {
      findOne: jest.fn(),
      increment: jest.fn(),
      create: jest.fn()
    }
  }
})

describe('metadata model', () => {
  describe('increaseCount', () => {
    beforeEach(() => {
      ;(Metadata.findOne as jest.Mock).mockReset()
      ;(Metadata.increment as jest.Mock).mockReset()
      ;(Metadata.create as jest.Mock).mockReset()
    })

    it('should increase the counter and return the updated value', async () => {
      ;(Metadata.findOne as jest.Mock).mockResolvedValueOnce(Metadata)
      ;(Metadata.increment as jest.Mock).mockResolvedValueOnce({ count: 1 })

      expect(await increaseCount()).toBe(1)

      expect(Metadata.findOne).toHaveBeenCalledTimes(1)
      expect(Metadata.increment).toHaveBeenCalledTimes(1)
    })

    it('should return error if there is no counter', async () => {
      ;(Metadata.findOne as jest.Mock).mockResolvedValueOnce(null)
      ;(Metadata.create as jest.Mock).mockResolvedValueOnce(Metadata)
      ;(Metadata.increment as jest.Mock).mockResolvedValueOnce({ count: 1 })

      expect(await increaseCount()).toBe(1)

      expect(Metadata.findOne).toHaveBeenCalledTimes(1)
      expect(Metadata.create).toHaveBeenCalledTimes(1)
      expect(Metadata.increment).toHaveBeenCalledTimes(1)
    })
  })
})
