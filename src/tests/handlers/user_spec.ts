import app from '../../server';
import supertest from 'supertest';
import { UserData } from '../../models/user';

const request = supertest(app);

describe('User endpoints', () => {
  const mockUserCredentials: UserData = {
    username: 'testUser',
    password: 'testpass',
  };

  let mockUserToken: string;

  it('index returns 401 with no token', async () => {
    const response = await request.get('/users');
    expect(response.status).toBe(401);
  });

  it('show returns 401 with no token', async () => {
    const response = await request.get('/users/5');
    expect(response.status).toBe(401);
  });

  it('update returns 401 with no token', async () => {
    const response = await request.put('/users/5');
    expect(response.status).toBe(401);
  });

  it('create saves user and returns token', async () => {
    const response = await request.post('/users').send(mockUserCredentials);
    mockUserToken = response.body;

    expect(typeof mockUserToken).toEqual('string');
  });

  it('index + token returns users array', async () => {
    const response = await request.get('/users').set('authorization', `Bearer ${mockUserToken}`);
    expect(Array.isArray(response.body)).toBeTrue();
  });

  it('show returns user', async () => {
    const response = await request.get('/users/1').set('authorization', `Bearer ${mockUserToken}`);

    expect(typeof response.body.username).toEqual('string');
  });

  it('update + token doesnt update user if doesnt match with token', async () => {
    const response = await request
      .put('/users/1')
      .send({
        username: 'Harry',
      })
      .set('authorization', `Bearer ${mockUserToken}`);

    expect(response.status).toEqual(401);
  });

  it('login returns user token', async () => {
    const response = await request
      .get('/login')
      .send(mockUserCredentials)
      .set('authorization', `Bearer ${mockUserToken}`);

    expect(typeof response.body).toEqual('string');
  });
});
