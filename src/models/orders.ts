import client from '../database';

export interface Order extends OrderData {
  id: number;
  complete: boolean;
}

export interface OrderData {
  user_id: number;
  wands_amount: { [wand_id: number]: number };
}

export class OrderStore {
  async index(uid: number): Promise<Order[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM orders WHERE user_id=$1';
      const result = await conn.query(sql, [uid]);

      conn.release();

      return result.rows;
    } catch (e) {
      throw new Error(`Could not get orders. Error: ${e}`);
    }
  }

  async show(id: number, uid: number): Promise<Order> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM orders WHERE id=$1 AND user_id=$2';
      const result = await conn.query(sql, [id, uid]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find order ${id}. Error: ${err}`);
    }
  }

  async create(o: OrderData): Promise<Order> {
    try {
      const conn = await client.connect();
      const sql =
        'INSERT INTO orders (complete, user_id, wands_amount) VALUES($1, $2, $3) RETURNING *';
      const result = await conn.query(sql, [false, o.user_id, o.wands_amount]);
      const order = result.rows[0];

      conn.release();

      return order;
    } catch (err) {
      throw new Error(`Could not add new order. Error: ${err}`);
    }
  }

  async update(o: Order): Promise<void> {
    try {
      const conn = await client.connect();
      const sql = 'UPDATE orders SET wands_amount=$1 WHERE id=$2 AND user_id=$3 AND complete=$4';
      await conn.query(sql, [o.wands_amount, o.id, o.user_id, false]);

      conn.release();
    } catch (err) {
      throw new Error(`Could not update order ${o.id}. Error: ${err}`);
    }
  }

  async complete(id: number, uid: number): Promise<void> {
    try {
      const conn = await client.connect();
      const sql = 'UPDATE orders SET complete=$1 WHERE id=$2 AND user_id=$3';
      await conn.query(sql, [true, id, uid]);

      conn.release();
    } catch (err) {
      throw new Error(`Could not complete order ${id}. Error: ${err}`);
    }
  }

  async completedByUser(uid: number): Promise<Order[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM orders WHERE user_id=$1 AND complete=$2';
      const result = await conn.query(sql, [uid, true]);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could find complete orders from user ${uid}. Error: ${err}`);
    }
  }

  async delete(id: number, uid: number): Promise<Order> {
    try {
      const conn = await client.connect();
      const sql = 'DELETE FROM orders WHERE id=$1 AND user_id=$2 AND complete=$3';
      const result = await conn.query(sql, [id, uid, false]);
      const order = result.rows[0];

      conn.release();

      return order;
    } catch (err) {
      throw new Error(`Could not delete order ${id}. Error: ${err}`);
    }
  }
}
