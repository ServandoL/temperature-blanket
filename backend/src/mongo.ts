import { Db, Document, MongoClient, MongoClientOptions } from 'mongodb';
import { log } from './index.js';
import { toError } from './utils.js';

export class MongoRepo {
  private readonly _client: MongoClient;
  private _db: Db;

  constructor(url: string, options?: MongoClientOptions) {
    const db = process.env['MONGO_DB'];
    if (!db) throw new Error('MONGO_DB env is required.');
    this._client = new MongoClient(url, options);
    this._db = this._client.db(db);
    this._client
      .on('error', (err) => {
        log.error({ loc: MongoRepo.name, error: toError(err) });
      })
      .on('connectionCreated', (event) => {
        log.info({ loc: MongoRepo.name, event });
      })
      .on('commandFailed', (err) => {
        log.error({ loc: MongoRepo.name, error: err });
      })
      .on('connectionClosed', (event) => {
        log.info({ loc: MongoRepo.name, event });
      })
      .on('connectionReady', (event) => {
        log.info({ loc: MongoRepo.name, event });
      })
      .on('commandStarted', (event) => {
        log.info({ loc: MongoRepo.name, event });
      });
  }

  public static _instance: MongoRepo;

  public static get instance() {
    return MongoRepo._instance;
  }

  public get client() {
    return this._client;
  }

  public static async prepare(options?: MongoClientOptions) {
    const url = process.env['MONGO_URL'];
    if (!url) throw new Error('MongoRepo URL must be defined');
    const mongo = new MongoRepo(url, options);
    await mongo.client.connect();
    MongoRepo._instance = mongo;
  }

  public collection<T extends Document>(name: string) {
    return this._db.collection<T>(name);
  }
}
