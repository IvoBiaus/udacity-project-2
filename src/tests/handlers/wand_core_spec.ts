import app from '../../server';
import supertest from 'supertest';
import { UserData } from '../../models/user';
import { Core, CoreData } from '../../models/wand_core';

const request = supertest(app);

describe('Wands Cores endpoints', () => {
  const mockUserCredentials: UserData = {
    username: 'testUser',
    password: 'testpass',
  };

  const coreData: CoreData = {
    name: 'Unicorn hair',
    notes:
      'Unicorn hair generally produces the most consistent magic, and is least subject to fluctuations and blockages.',
  };
  let mockUserToken: string;

  let mockCore: Core;

  beforeAll(async () => {
    const response = await request.post('/users').send(mockUserCredentials);
    mockUserToken = response.body;
  });

  it('create returns 401 with no token', async () => {
    const response = await request.post('/cores');
    expect(response.status).toBe(401);
  });

  it('update returns 401 with no token', async () => {
    const response = await request.put('/cores/5');
    expect(response.status).toBe(401);
  });

  it('remove returns 401 with no token', async () => {
    const response = await request.delete('/cores/5');
    expect(response.status).toBe(401);
  });

  it('index + token returns cores array', async () => {
    const response = await request.get('/cores').set('authorization', `Bearer ${mockUserToken}`);
    expect(Array.isArray(response.body)).toBeTrue();
  });

  it('create + token saves core', async () => {
    const createRes = await request
      .post('/cores')
      .send(coreData)
      .set('authorization', `Bearer ${mockUserToken}`);

    mockCore = createRes.body;

    expect(mockCore.name).toEqual(coreData.name);
  });

  it('show returns core', async () => {
    const response = await request
      .get(`/cores/${mockCore.id}`)
      .set('authorization', `Bearer ${mockUserToken}`);

    expect(response.body.name).toEqual(coreData.name);
  });

  it('update + token updates core', async () => {
    const response = await request
      .put(`/cores/${mockCore.id}`)
      .send({
        name: 'Dragon heartstring',
        notes:
          'As a rule, dragon heartstrings produce wands with the most power, and which are capable of the most flamboyant spells.',
      })
      .set('authorization', `Bearer ${mockUserToken}`);

    expect(response.body.name).toEqual('Dragon heartstring');
  });

  it('remove + token deletes core', async () => {
    await request.delete(`/cores/${mockCore.id}`).set('authorization', `Bearer ${mockUserToken}`);
    const response = await request
      .get(`/cores/${mockCore.id}`)
      .set('authorization', `Bearer ${mockUserToken}`);
    expect(response.body.id).toBeUndefined();
  });
});
