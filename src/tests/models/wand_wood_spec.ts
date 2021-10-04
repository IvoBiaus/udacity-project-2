import { WandWoodStore, Wood, WoodData } from '../../models/wand_wood';

const store = new WandWoodStore();

describe('Wand Wood Model', () => {
  let mockWoodData: WoodData;
  let mockWood: Wood;

  beforeAll(async () => {
    mockWoodData = {
      name: 'Acacia',
      genus: 'Acacia',
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

  it('create should add a wood', async () => {
    mockWood = await store.create(mockWoodData);
    expect([mockWood.name, mockWood.genus, mockWood.notes]).toEqual([
      mockWoodData.name,
      mockWoodData.genus,
      mockWoodData.notes,
    ]);
  });

  it('index should return a list of woods', async () => {
    const result = await store.index();
    expect(Array.isArray(result)).toBeTrue();
  });

  it('show should return the correct wood', async () => {
    const result = await store.show(mockWood.id);
    expect(result).toEqual(mockWood);
  });

  it('update should update the wood', async () => {
    await store.update({ ...mockWood, name: 'newName' });
    const result = await store.show(mockWood.id);

    expect(result.name).toEqual('newName');
  });

  it('delete should remove the wood', async () => {
    await store.delete(mockWood.id);
    const result = await store.show(mockWood.id);
    expect(result).toBeUndefined();
  });
});
