import { When, Then } from '@cucumber/cucumber'
import { hostUrl } from './global'
import axios, { AxiosError } from 'axios'
import expect from 'expect'
import { readFileSync } from 'fs'
import path from 'path'

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
  expect(this.response.data).toEqual(expected)
})

Then('the response I received should contain {string}', function (response: string) {
  expect(this.response.data).toContain(response)
})

When('I send a {string} request to {string} with the file {string}', async function (method: string, endpoint: string, filePath: string) {
  const data = JSON.parse(readFileSync(path.join(__dirname, '..', filePath), { encoding: 'utf-8' }))

  this.response = await axios({
    method,
    url: `${hostUrl}${endpoint}`,
    data
  })
})

When('I send a {string} request to {string} with the following json', async function (method: string, endpoint: string, json: string) {
  try {
    this.response = await axios({
      method,
      url: `${hostUrl}${endpoint}`,
      data: JSON.parse(json)
    })
  } catch (e) {
    this.response = (e as AxiosError).response
  }
})
