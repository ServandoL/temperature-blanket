import { Db, MongoClient, Document, MongoClientOptions } from 'mongodb';

export class MongoRepo {
  public static _instance: MongoRepo;
  private readonly _client: MongoClient;
  private _db: Db;

  constructor(url: string, options?: MongoClientOptions) {
    const db = process.env['MONGO_DB'];
    if (!db) throw new Error('MONGO_DB env is required.');
    this._client = new MongoClient(url, options);
    this._client
      .on('error', (err) => {
        console.error(err);
      })
      .on('connectionCreated', (event) => {
        console.log(event);
      })
      .on('commandFailed', (err) => {
        console.error(err);
      })
      .on('connectionClosed', (event) => {
        console.log(event);
      })
      .on('connectionReady', (event) => {
        console.log(event);
      });
    this._db = this._client.db(db);
  }

  public get client() {
    return this._client;
  }

  public static get instance() {
    return MongoRepo._instance;
  }

  public static async prepare(options?: MongoClientOptions) {
    const url = process.env['MONGO_URL'];
    if (!url) throw new Error('MongoRepo URL must be defined');
    const mongo = new MongoRepo(url, options);
    await mongo.client.connect();
  }

  public collection<T extends Document>(name: string) {
    return this._db.collection<T>(name);
  }
}
