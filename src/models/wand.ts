import client from '../database';

export interface Wand extends WandData {
  id: number;
}

export interface WandData {
  wood_id: number;
  length: number;
  core_id: number;
  flexibility: string;
  notes: string;
  price: number;
}

export class WandStore {
  async index(): Promise<Wand[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM wands';
      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (e) {
      throw new Error(`Could not get wands. Error: ${e}`);
    }
  }

  async show(id: number): Promise<Wand> {
    try {
      const conn = await client.connect();
      const sql = `SELECT * FROM wands WHERE id=${id}`;
      const result = await conn.query(sql);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find wand ${id}. Error: ${err}`);
    }
  }

  async create(w: WandData): Promise<Wand> {
    try {
      const conn = await client.connect();
      const sql =
        'INSERT INTO wands (wood_id, length, core_id, flexibility, notes, price) VALUES($1, $2, $3, $4, $5, $6) RETURNING *';
      const result = await conn.query(sql, [
        w.wood_id,
        w.length,
        w.core_id,
        w.flexibility,
        w.notes,
        w.price,
      ]);

      const wand = result.rows[0];

      conn.release();

      return wand;
    } catch (err) {
      throw new Error(`Could not add new wand. Error: ${err}`);
    }
  }

  async update(w: Wand): Promise<void> {
    try {
      const conn = await client.connect();
      const sql =
        'UPDATE wands SET flexibility=$1, length=$2, notes=$3, core_id=$4, wood_id=$5, price=$6 WHERE id=$7';
      await conn.query(sql, [
        w.flexibility,
        w.length,
        w.notes,
        w.core_id,
        w.wood_id,
        w.price,
        w.id,
      ]);

      conn.release();
    } catch (err) {
      throw new Error(`Could not update wand ${w.id}. Error: ${err}`);
    }
  }

  async delete(id: number): Promise<Wand> {
    try {
      const conn = await client.connect();
      const sql = 'DELETE FROM wands WHERE id=($1)';
      const result = await conn.query(sql, [id]);
      const wand = result.rows[0];

      conn.release();

      return wand;
    } catch (err) {
      throw new Error(`Could not delete wand ${id}. Error: ${err}`);
    }
  }
}
