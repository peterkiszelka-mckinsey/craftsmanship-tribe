// Stryker disable all
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

export class TestDbHandler {
  private mongod?: MongoMemoryServer;

  async connect(): Promise<void> {
    this.mongod = await MongoMemoryServer.create();
    const uri = this.mongod.getUri();
    await mongoose.connect(uri);
  }

  async clear(): Promise<void> {
    const collections = await mongoose.connection.db.collections();
    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
  }

  async close(): Promise<void> {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await this.mongod?.stop();
  }
}
