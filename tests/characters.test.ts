import request from 'supertest'
import server from '../src/app'
import { describe, it, afterEach, expect } from '@jest/globals'

let token

afterAll(async () => {
  await server.close()
})

afterEach(async () => {
  await server.close()
})

beforeAll(async () => {
  const user = {
    username: 'augusto',
    password: '123456'
  }

  const response = await request(server).post('/users/login').send(user)
  token = response.body.token
})

describe('get characters tests', () => {
  it('get all rick & morty characters', (done) => {
    request(server)
      .get('/characters/all?page=1&name=')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect((response) => {
        const text = response.text
        const json = JSON.parse(text)
        expect(json.results).toBeDefined()
        expect(json.results).toHaveLength(20)
        expect(response.statusCode).toEqual(200)
      })
      .end(done)
  })
  it('get all rick & morty characters without token', (done) => {
    request(server)
      .get('/characters/all?page=1&name=')
      .expect(401)
      .expect((response) => {
        const text = response.text
        const json = JSON.parse(text)
        expect(json.success).toBeFalsy()
        expect(json.code).toBe('AUTHORIZATION_ERROR')
        expect(response.statusCode).toEqual(401)
      })
      .end(done)
  })
  it('get all rick & morty characters with character name to return filtered data', (done) => {
    request(server)
      .get('/characters/all?page=1&name=morty')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect((response) => {
        const text = response.text
        const json = JSON.parse(text)
        expect(json.results).toBeDefined()
        expect(json.results).toHaveLength(20)
        expect(json.results[0].name).toContain('Morty')
        expect(response.statusCode).toEqual(200)
      })
      .end(done)
  })
  it('request from incorrect route', (done) => {
    request(server)
      .get('/characters/al?page=1&name=morty')
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json')
      .expect(404)
      .expect((response) => {
        const text = response.text
        const json = JSON.parse(text)
        expect(json.success).toBeFalsy()
        expect(json.code).toEqual('NO_ROUTED_MATCHED')
        expect(response.statusCode).toEqual(404)
      })
      .end(done)
  })
  it('get all rick & morty characters with incorrect token', (done) => {
    request(server)
      .get('/characters/al?page=1&name=morty')
      .set('Authorization', `Bearer ${'sadadasd'}`)
      .set('Content-Type', 'application/json')
      .expect(403)
      .expect((response) => {
        const text = response.text
        const json = JSON.parse(text)
        expect(json.success).toBeFalsy()
        expect(json.code).toEqual('AUTHENTICATION_ERROR')
        expect(response.statusCode).toEqual(403)
      })
      .end(done)
  })
})
