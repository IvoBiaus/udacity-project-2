import { isValidPassword, User, UserData, UserStore } from '../../models/user';

const store = new UserStore();

describe('User Model', () => {
  let mockUser: User;

  const mockUserData: UserData = {
    username: 'test',
    password: 'testpass',
  };

  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have an show method', () => {
    expect(store.show).toBeDefined();
  });

  it('should have an authenticate method', () => {
    expect(store.authenticate).toBeDefined();
  });

  it('should have an create method', () => {
    expect(store.create).toBeDefined();
  });

  it('should have an update method', () => {
    expect(store.update).toBeDefined();
  });

  it('create user should store a valid password hash', async () => {
    mockUser = await store.create(mockUserData);
    expect(isValidPassword(mockUserData.password, mockUser.password_digest)).toBeTrue();
  });

  it('create user should not store the password in pain text', async () => {
    const result = await store.create(mockUserData);
    expect(mockUserData.password === result.password_digest).toBeFalse();
  });

  it('index should return a list of usernames', async () => {
    const result = await store.index();
    expect(Array.isArray(result)).toBeTrue();
  });

  it('show should return the username of the selected user', async () => {
    const result = await store.show(mockUser.id);
    expect(result.username).toEqual(mockUser.username);
  });

  it('update should update the username', async () => {
    await store.update({ ...mockUserData, username: 'newName' }, mockUser.id);
    const result = await store.show(mockUser.id);

    expect(result.username).toEqual('newName');
  });
});
