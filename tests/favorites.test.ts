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

describe('favorite tests', () => {
  it('add character as favorite', (done) => {
    const body = {
      favoriteId: 5
    };
    request(server)
      .post('/favorites/add')
      .set('Authorization', `Bearer ${token}`)
      .send(body)
      .expect(200)
      .expect((response) => {  
        expect(response.statusCode).toEqual(200)
      })
      .end(done)
  })
  it('delete character as favorite', (done) => {
    request(server)
      .delete(`/favorites/remove/${5}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect((response) => {
        expect(response.statusCode).toEqual(200)
      })
      .end(done)
  })
})
