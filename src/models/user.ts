import bcrypt from 'bcrypt';
import client from '../database';

const { CRYPT_PASSWORD: pepper, SALT_ROUNDS: saltRounds } = process.env;

export type User = {
  id: number;
  username: string;
  password_digest: string;
};

export interface UserData extends UserPublicData {
  password: string;
}

export type UserPublicData = {
  username: string;
};

export const isValidPassword = (pass: string, digest: string): boolean =>
  bcrypt.compareSync(pass + pepper, digest);

export class UserStore {
  async index(): Promise<UserPublicData[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT username FROM users';
      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (e) {
      throw new Error(`Could not get users. Error: ${e}`);
    }
  }

  async show(id: number): Promise<UserPublicData> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT username FROM users WHERE id=$1';
      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find user ${id}. Error: ${err}`);
    }
  }

  async authenticate(u: UserData): Promise<User | null> {
    const conn = await client.connect();
    const sql = 'SELECT password_digest FROM users WHERE username=($1)';

    const result = await conn.query(sql, [u.username]);
    if (result.rows.length) {
      const user: User = result.rows[0];

      if (isValidPassword(u.password, user.password_digest)) {
        return user;
      }
    }
    return null;
  }

  async create(u: UserData): Promise<User> {
    try {
      const conn = await client.connect();
      const hash = bcrypt.hashSync(u.password + pepper, parseInt(saltRounds || '0'));
      const sql = 'INSERT INTO users (username, password_digest) VALUES($1, $2) RETURNING *';
      const result = await conn.query(sql, [u.username, hash]);
      const user = result.rows[0];

      conn.release();

      return user;
    } catch (err) {
      throw new Error(`Could not create user ${u.username}. Error: ${err}`);
    }
  }

  async update(u: UserData, id: number): Promise<void> {
    try {
      const conn = await client.connect();
      const hash = bcrypt.hashSync(u.password + pepper, parseInt(saltRounds || '0'));
      const sql = 'UPDATE users SET username=$1, password_digest=$2 WHERE id=$3';
      await conn.query(sql, [u.username, hash, id]);

      conn.release();
    } catch (err) {
      throw new Error(`Could not update user ${id}. Error: ${err}`);
    }
  }
}
