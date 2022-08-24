import { hello } from './hello'

beforeAll(() => {
  jest.useFakeTimers({
    now: new Date(Date.UTC(2022, 0, 1, 0, 0, 0, 0))
  })
})

describe('hello', () => {
  it('should return the current system date time in UTC', () => {
    expect(hello()).toBe('Hello world, the time is currently 2022/01/01 00:00:00')
  })
})
