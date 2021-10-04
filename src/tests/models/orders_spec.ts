import { Order, OrderData, OrderStore } from '../../models/orders';
import { User, UserData, UserStore } from '../../models/user';

const store = new OrderStore();
const storeUser = new UserStore();

describe('Order Model', () => {
  let mockOrderData: OrderData;
  let mockOrder: Order;

  let mockUser: User;

  beforeAll(async () => {
    const userData: UserData = {
      username: 'test',
      password: 'testpass',
    };
    mockUser = await storeUser.create(userData);

    mockOrderData = {
      user_id: mockUser.id,
      wands_amount: { 0: 5 },
    };
  });

  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have an show method', () => {
    expect(store.show).toBeDefined();
  });

  it('should have an create method', () => {
    expect(store.create).toBeDefined();
  });

  it('should have a update method', () => {
    expect(store.update).toBeDefined();
  });

  it('should have an complete method', () => {
    expect(store.complete).toBeDefined();
  });

  it('should have an completedByUser method', () => {
    expect(store.completedByUser).toBeDefined();
  });

  it('should have an delete method', () => {
    expect(store.delete).toBeDefined();
  });

  it('create should add an order with the user id', async () => {
    mockOrder = await store.create(mockOrderData);
    expect([mockOrder.complete, mockOrder.wands_amount, mockOrder.user_id]).toEqual([
      false,
      mockOrderData.wands_amount,
      mockUser.id,
    ]);
  });

  it('index should return a list of orders from the user', async () => {
    const result = await store.index(mockUser.id);
    expect(Array.isArray(result)).toBeTrue();
  });

  it('show should return the correct order from the user', async () => {
    const result = await store.show(mockOrder.id, mockUser.id);
    expect(result).toEqual(mockOrder);
  });

  it('update should update the order when its not completed', async () => {
    const newWandsOrder = { 1: 10, 2: 15 };
    mockOrder.wands_amount = newWandsOrder;

    await store.update(mockOrder);
    const result = await store.show(mockOrder.id, mockUser.id);

    expect([result.complete, result.wands_amount]).toEqual([false, newWandsOrder]);
  });

  it('complete should set the order as complete', async () => {
    await store.complete(mockOrder.id, mockUser.id);
    const result = await store.show(mockOrder.id, mockUser.id);

    expect(result.complete).toBeTrue();
  });

  it('completedByUser should return the completed orders by the user', async () => {
    const result = await store.completedByUser(mockUser.id);

    expect(result[0]).toEqual({ ...mockOrder, complete: true });
  });

  it('update cannot update the order when its completed', async () => {
    const oldWandsOrder = { ...mockOrder.wands_amount };
    const newWandsOrder = { 3: 20 };

    await store.update({ ...mockOrder, wands_amount: newWandsOrder });
    const result = await store.show(mockOrder.id, mockUser.id);

    expect([result.complete, result.wands_amount]).toEqual([true, oldWandsOrder]);
  });

  it('delete cannot remove the order from the user when its completed', async () => {
    await store.delete(mockOrder.id, mockUser.id);
    const result = await store.show(mockOrder.id, mockUser.id);
    expect(result).toEqual({ ...mockOrder, complete: true });
  });

  it('delete should remove the order from the user when its not completed', async () => {
    const tempOrderData = {
      user_id: mockUser.id,
      wands_amount: { 4: 25 },
    };
    const tempOrder = await store.create(tempOrderData);
    const newOrder = await store.show(tempOrder.id, mockUser.id);
    expect(newOrder).toEqual(tempOrder);

    await store.delete(tempOrder.id, mockUser.id);
    const result = await store.show(tempOrder.id, mockUser.id);
    expect(result).toBeUndefined();
  });
});
