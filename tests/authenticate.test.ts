import request from 'supertest';
import server from '../src/app';
import { describe, it , afterEach, expect} from '@jest/globals';


afterAll(async () => {
  await server.close();
});

afterEach(async () => {
  await server.close();
});


describe('authentication tests', () => {
  it('success authentication', (done) => {
    const user = {
      username: 'augusto',
      password: '123456',
    };
    request(server)
      .post('/users/login')
      .send(user)
      .expect(200)
      .expect((response) => {
        const text = response.text;
        const json = JSON.parse(text);
        expect(json.username).toEqual(user.username);
        expect(json.token).toBeDefined();
        expect(response.statusCode).toEqual(200);
      })
      .end(done);
  });
  it('failure authentication',  (done) => {
    const user = {
      username: 'augusto',
      password: '654321',
    };
    request(server).post('/users/login').send(user).expect(400)
    .expect((response) => {
      const text = response.text;
      const json = JSON.parse(text);
      expect(json.code).toBe('WRONG_DATA'); 
      expect(response.statusCode).toEqual(400);
    })
    .end(done);
  });
});