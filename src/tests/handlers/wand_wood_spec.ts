import app from '../../server';
import supertest from 'supertest';
import { UserData } from '../../models/user';
import { Wood, WoodData } from '../../models/wand_wood';

const request = supertest(app);

describe('Wands Woods endpoints', () => {
  const mockUserCredentials: UserData = {
    username: 'testUser',
    password: 'testpass',
  };

  const woodData: WoodData = {
    name: 'Alder',
    genus: 'Alnus',
    notes:
      'Alder is an unyielding wood, yet I have discovered that its ideal owner is not stubborn or obstinate.',
  };
  let mockUserToken: string;

  let mockWood: Wood;

  beforeAll(async () => {
    const response = await request.post('/users').send(mockUserCredentials);
    mockUserToken = response.body;
  });

  it('create returns 401 with no token', async () => {
    const response = await request.post('/woods');
    expect(response.status).toBe(401);
  });

  it('update returns 401 with no token', async () => {
    const response = await request.put('/woods/5');
    expect(response.status).toBe(401);
  });

  it('remove returns 401 with no token', async () => {
    const response = await request.delete('/woods/5');
    expect(response.status).toBe(401);
  });

  it('index + token returns woods array', async () => {
    const response = await request.get('/woods').set('authorization', `Bearer ${mockUserToken}`);
    expect(Array.isArray(response.body)).toBeTrue();
  });

  it('create + token saves wood', async () => {
    const createRes = await request
      .post('/woods')
      .send(woodData)
      .set('authorization', `Bearer ${mockUserToken}`);

    mockWood = createRes.body;

    expect(mockWood.name).toEqual(woodData.name);
  });

  it('show returns wood', async () => {
    const response = await request
      .get(`/woods/${mockWood.id}`)
      .set('authorization', `Bearer ${mockUserToken}`);

    expect(response.body.name).toEqual(woodData.name);
  });

  it('update + token updates wood', async () => {
    const response = await request
      .put(`/woods/${mockWood.id}`)
      .send({
        name: 'Apple',
        genus: 'Malus domestica',
      })
      .set('authorization', `Bearer ${mockUserToken}`);

    expect(response.body.name).toEqual('Apple');
  });

  it('remove + token deletes wood', async () => {
    await request.delete(`/woods/${mockWood.id}`).set('authorization', `Bearer ${mockUserToken}`);
    const response = await request
      .get(`/woods/${mockWood.id}`)
      .set('authorization', `Bearer ${mockUserToken}`);
    expect(response.body.id).toBeUndefined();
  });
});
