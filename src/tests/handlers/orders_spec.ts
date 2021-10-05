import app from '../../server';
import supertest from 'supertest';
import { UserData } from '../../models/user';
import { Order } from '../../models/orders';

const request = supertest(app);

describe('Order endpoints', () => {
  const mockUserCredentials: UserData = {
    username: 'testUser',
    password: 'testpass',
  };
  let mockUserToken: string;

  let mockOrder: Order;

  beforeAll(async () => {
    const response = await request.post('/users').send(mockUserCredentials);
    mockUserToken = response.body;
  });

  it('index returns 401 with no token', async () => {
    const response = await request.get('/orders');
    expect(response.status).toBe(401);
  });

  it('show returns 401 with no token', async () => {
    const response = await request.get('/orders/5');
    expect(response.status).toBe(401);
  });

  it('completed by user returns 401 with no token', async () => {
    const response = await request.get('/orders/completed');
    expect(response.status).toBe(401);
  });

  it('create returns 401 with no token', async () => {
    const response = await request.post('/orders');
    expect(response.status).toBe(401);
  });

  it('update returns 401 with no token', async () => {
    const response = await request.put('/orders/5');
    expect(response.status).toBe(401);
  });

  it('complete returns 401 with no token', async () => {
    const response = await request.put('/orders/5/complete');
    expect(response.status).toBe(401);
  });

  it('delete returns 401 with no token', async () => {
    const response = await request.delete('/orders/5');
    expect(response.status).toBe(401);
  });

  it('index + token returns orders array', async () => {
    const response = await request.get('/orders').set('authorization', `Bearer ${mockUserToken}`);
    expect(Array.isArray(response.body)).toBeTrue();
  });

  it('create + token saves order', async () => {
    const createRes = await request
      .post('/orders')
      .send({ wands_amount: { 1: 5 } })
      .set('authorization', `Bearer ${mockUserToken}`);

    mockOrder = createRes.body;

    expect(mockOrder.wands_amount).toEqual({ 1: 5 });
  });

  it('show + token returns order', async () => {
    const response = await request
      .get(`/orders/${mockOrder.id}`)
      .set('authorization', `Bearer ${mockUserToken}`);

    expect(response.body.wands_amount).toEqual({ 1: 5 });
  });

  it('update + token updates order', async () => {
    const response = await request
      .put(`/orders/${mockOrder.id}`)
      .send({ wands_amount: { 2: 10 } })
      .set('authorization', `Bearer ${mockUserToken}`);

    expect(response.body.wands_amount).toEqual({ 2: 10 });
  });

  it('complete + token updates order, setting it as complete', async () => {
    await request
      .put(`/orders/${mockOrder.id}/complete`)
      .set('authorization', `Bearer ${mockUserToken}`);
    const response = await request
      .get(`/orders/${mockOrder.id}`)
      .set('authorization', `Bearer ${mockUserToken}`);

    expect(response.body.complete).toBeTrue();
  });

  it('completed by user + token returns completed orders', async () => {
    const response = await request
      .get('/orders/completed')
      .set('authorization', `Bearer ${mockUserToken}`);

    expect(response.body.every((item: Order) => item.complete)).toBeTrue();
  });

  it('remove + token cannot delete completed orders', async () => {
    await request.delete(`/orders/${mockOrder.id}`).set('authorization', `Bearer ${mockUserToken}`);
    const response = await request
      .get(`/orders/${mockOrder.id}`)
      .set('authorization', `Bearer ${mockUserToken}`);
    expect(response.body.id).toEqual(mockOrder.id);
  });

  it('remove + token deletes order if not completed', async () => {
    const createRes = await request
      .post('/orders')
      .send({ wands_amount: { 3: 15 } })
      .set('authorization', `Bearer ${mockUserToken}`);
    const newId = createRes.body.id;

    const responsePrev = await request
      .get(`/orders/${newId}`)
      .set('authorization', `Bearer ${mockUserToken}`);
    expect(responsePrev.body.id).toEqual(newId);

    await request.delete(`/orders/${newId}`).set('authorization', `Bearer ${mockUserToken}`);
    const response = await request
      .get(`/orders/${newId}`)
      .set('authorization', `Bearer ${mockUserToken}`);
    expect(response.body.id).toBeUndefined();
  });
});
