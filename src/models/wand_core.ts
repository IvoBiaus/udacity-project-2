import client from '../database';

export interface Core extends CoreData {
  id: number;
}

export interface CoreData {
  name: string;
  notes: string;
}

export class WandCoreStore {
  async index(): Promise<Core[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM cores';
      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (e) {
      throw new Error(`Could not get cores. Error: ${e}`);
    }
  }

  async show(id: number): Promise<Core> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM cores WHERE id=$1';
      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find core ${id}. Error: ${err}`);
    }
  }

  async create(c: CoreData): Promise<Core> {
    try {
      const conn = await client.connect();
      const sql = 'INSERT INTO cores (name, notes) VALUES($1, $2) RETURNING *';
      const result = await conn.query(sql, [c.name, c.notes]);
      const core = result.rows[0];

      conn.release();

      return core;
    } catch (err) {
      throw new Error(`Could not add new core ${c.name}. Error: ${err}`);
    }
  }

  async update(c: Core): Promise<void> {
    try {
      const conn = await client.connect();
      const sql = 'UPDATE cores SET name=$1, notes=$2 WHERE id=$3';
      await conn.query(sql, [c.name, c.notes, c.id]);

      conn.release();
    } catch (err) {
      throw new Error(`Could not update core ${c.id}. Error: ${err}`);
    }
  }

  async delete(id: number): Promise<Core> {
    try {
      const conn = await client.connect();
      const sql = 'DELETE FROM cores WHERE id=($1)';
      const result = await conn.query(sql, [id]);
      const core = result.rows[0];

      conn.release();

      return core;
    } catch (err) {
      throw new Error(`Could not delete core ${id}. Error: ${err}`);
    }
  }
}
