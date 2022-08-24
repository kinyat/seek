import { When, Then } from '@cucumber/cucumber'
import { hostUrl } from './global'
import axios from 'axios'
import expect from 'expect'

When('I send a {string} request to {string}', async function (method: string, endpoint: string) {
  this.response = await axios({
    method,
    url: `${hostUrl}${endpoint}`
  })
})

Then('I should have received {string} HTTP code', function (code: string) {
  expect(this.response.status).toBe(+code)
})

Then('I should received the following json', function (json: string) {
  const expected = JSON.parse(json)
  expect(this.response.data.json).toEqual(expected)
})

Then('the response I received should contain {string}', function (response: string) {
  expect(this.response.data).toContain(response)
})
