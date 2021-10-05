import app from '../../server';
import supertest from 'supertest';
import { UserData } from '../../models/user';
import { Wand, WandData } from '../../models/wand';
import { Wood } from '../../models/wand_wood';
import { Core } from '../../models/wand_core';

const request = supertest(app);

describe('Wands endpoints', () => {
  const mockUserCredentials: UserData = {
    username: 'testUser',
    password: 'testpass',
  };
  let wandData: WandData;
  let mockWand: Wand;

  let mockWood: Wood;
  let mockCore: Core;

  let mockUserToken: string;

  beforeAll(async () => {
    const userRes = await request.post('/users').send(mockUserCredentials);
    const coreRes = await request.post('/core').send({ name: 'a', notes: 'b' });
    const woodRes = await request.post('/wood').send({ name: 'a', notes: 'b', genus: 'c' });

    mockUserToken = userRes.body;
    mockCore = coreRes.body;
    mockWood = woodRes.body;

    wandData = {
      wood_id: mockWood.id,
      length: 12.75,
      core_id: mockCore.id,
      flexibility: 'Unyielding',
      notes: 'Some notes.',
      price: 10,
    };
  });

  afterAll(async () => {
    await request.delete(`/cores/${mockCore.id}`);
    await request.delete(`/woods/${mockWood.id}`);
  });

  it('create returns 401 with no token', async () => {
    const response = await request.post('/wands');
    expect(response.status).toBe(401);
  });

  it('update returns 401 with no token', async () => {
    const response = await request.put('/wands/5');
    expect(response.status).toBe(401);
  });

  it('remove returns 401 with no token', async () => {
    const response = await request.delete('/wands/5');
    expect(response.status).toBe(401);
  });

  it('index + token returns wands array', async () => {
    const response = await request.get('/wands').set('authorization', `Bearer ${mockUserToken}`);
    expect(Array.isArray(response.body)).toBeTrue();
  });

  it('create + token saves wand', async () => {
    const createRes = await request
      .post('/wands')
      .send(wandData)
      .set('authorization', `Bearer ${mockUserToken}`);

    mockWand = createRes.body;

    expect(mockWand.flexibility).toEqual(wandData.flexibility);
  });

  it('show returns wand', async () => {
    const response = await request
      .get(`/wands/${mockWand.id}`)
      .set('authorization', `Bearer ${mockUserToken}`);

    expect(response.body.flexibility).toEqual(wandData.flexibility);
  });

  it('update + token updates wand', async () => {
    const response = await request
      .put(`/wands/${mockWand.id}`)
      .send({
        ...wandData,
        flexibility: 'Flexible',
      })
      .set('authorization', `Bearer ${mockUserToken}`);

    expect(response.body.flexibility).toEqual('Flexible');
  });

  it('remove + token deletes wand', async () => {
    await request.delete(`/wands/${mockWand.id}`).set('authorization', `Bearer ${mockUserToken}`);
    const response = await request
      .get(`/wands/${mockWand.id}`)
      .set('authorization', `Bearer ${mockUserToken}`);
    expect(response.body.id).toBeUndefined();
  });
});
