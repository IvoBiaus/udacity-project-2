import { Wand, WandData, WandStore } from '../../models/wand';
import { Core, CoreData, WandCoreStore } from '../../models/wand_core';
import { WandWoodStore, WoodData, Wood } from '../../models/wand_wood';

const store = new WandStore();
const storeWood = new WandWoodStore();
const storeCore = new WandCoreStore();

describe('Wand Model', () => {
  let mockWandData: WandData;
  let mockWand: Wand;

  let mockWood: Wood;
  let mockCore: Core;

  beforeAll(async () => {
    const woodData: WoodData = {
      name: 'Wand test - wood',
      genus: 'Wand test - wood',
      notes: 'Wand test - wood',
    };
    const coreData: CoreData = {
      name: 'Wand test - core',
      notes: 'Wand test - core',
    };
    mockWood = await storeWood.create(woodData);
    mockCore = await storeCore.create(coreData);

    mockWandData = {
      wood_id: mockWood.id,
      length: 12.75,
      core_id: mockCore.id,
      flexibility: 'Unyielding',
      notes: 'Some description.',
      price: 10,
    };
  });

  afterAll(async () => {
    await storeWood.delete(mockWood.id);
    await storeCore.delete(mockCore.id);
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

  it('create should add a wand', async () => {
    mockWand = await store.create(mockWandData);
    expect([mockWand.core_id, mockWand.wood_id, mockWand.length]).toEqual([
      mockWandData.core_id,
      mockWandData.wood_id,
      mockWandData.length,
    ]);
  });

  it('index should return a list of wands', async () => {
    const result = await store.index();
    expect(Array.isArray(result)).toBeTrue();
  });

  it('show should return the correct wand', async () => {
    const result = await store.show(mockWand.id);
    expect(result).toEqual(mockWand);
  });

  it('update should update the wand', async () => {
    await store.update({ ...mockWand, price: 20 });
    const result = await store.show(mockWand.id);

    expect(result.price).toEqual(20);
  });

  it('delete should remove the wand', async () => {
    await store.delete(mockWand.id);
    const result = await store.show(mockWand.id);
    expect(result).toBeUndefined();
  });
});
