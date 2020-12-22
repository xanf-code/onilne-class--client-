import { Collection, Db, MongoClient, ObjectID } from "mongodb";

export interface ConnectionResponse {
  database: Db;
  client: MongoClient;
}

export default class DatabaseUtils {
  static _client = new MongoClient(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  static async connect(): Promise<ConnectionResponse> {
    if (!this._client.isConnected()) {
      await this._client.connect();
    }
    const database = this._client.db("online-classroom");
    return { database, client: this._client };
  }

  static idIsValid(id: string) {
    try {
      new ObjectID(id);
      return true;
    } catch {
      return false;
    }
  }

  static async getUsersCollection(): Promise<Collection<any>> {
    const { database } = await DatabaseUtils.connect();
    return database.collection("users");
  }
}
