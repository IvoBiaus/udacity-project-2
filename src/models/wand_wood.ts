import client from '../database';

export interface Wood extends WoodData {
  id: number;
}

export type WoodData = {
  name: string;
  genus: string;
  notes: string;
};

export class WandWoodStore {
  async index(): Promise<Wood[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM woods';
      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (e) {
      throw new Error(`Could not get woods. Error: ${e}`);
    }
  }

  async show(id: number): Promise<Wood> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM woods WHERE id=$1';
      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find wood ${id}. Error: ${err}`);
    }
  }

  async create(w: WoodData): Promise<Wood> {
    try {
      const conn = await client.connect();
      const sql = 'INSERT INTO woods (name, genus, notes) VALUES($1, $2, $3) RETURNING *';
      const result = await conn.query(sql, [w.name, w.genus, w.notes]);
      const wood = result.rows[0];

      conn.release();

      return wood;
    } catch (err) {
      throw new Error(`Could not add new wood ${w.name}. Error: ${err}`);
    }
  }

  async update(w: Wood): Promise<void> {
    try {
      const conn = await client.connect();
      const sql = 'UPDATE woods SET name=$1, genus=$2, notes=$3 WHERE id=$4';
      await conn.query(sql, [w.name, w.genus, w.notes, w.id]);

      conn.release();
    } catch (err) {
      throw new Error(`Could not update wood ${w.id}. Error: ${err}`);
    }
  }

  async delete(id: number): Promise<Wood> {
    try {
      const conn = await client.connect();
      const sql = 'DELETE FROM woods WHERE id=($1)';
      const result = await conn.query(sql, [id]);
      const wood = result.rows[0];

      conn.release();

      return wood;
    } catch (err) {
      throw new Error(`Could not delete wood ${id}. Error: ${err}`);
    }
  }
}
