import { Core, CoreData, WandCoreStore } from '../../models/wand_core';

const store = new WandCoreStore();

describe('Wand Core Model', () => {
  let mockCoreData: CoreData;
  let mockCore: Core;

  beforeAll(async () => {
    mockCoreData = {
      name: 'Unicorn hair',
      notes: 'Some description.',
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

  it('should have an delete method', () => {
    expect(store.delete).toBeDefined();
  });

  it('create should add a core', async () => {
    mockCore = await store.create(mockCoreData);
    expect([mockCore.name, mockCore.notes]).toEqual([mockCoreData.name, mockCoreData.notes]);
  });

  it('index should return a list of cores', async () => {
    const result = await store.index();
    expect(Array.isArray(result)).toBeTrue();
  });

  it('show should return the correct core', async () => {
    const result = await store.show(mockCore.id);
    expect(result).toEqual(mockCore);
  });

  it('update should update the core', async () => {
    await store.update({ ...mockCore, name: 'newName' });
    const result = await store.show(mockCore.id);

    expect(result.name).toEqual('newName');
  });

  it('delete should remove the core', async () => {
    await store.delete(mockCore.id);
    const result = await store.show(mockCore.id);
    expect(result).toBeUndefined();
  });
});
