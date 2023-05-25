import { MongoProductOfferingRepository } from '../../../../../productOffering/adapters/driven/mongo/repository/mongo.productOffering.repository';
import { TestDbHandler } from '../../../../../testDbHandler';

describe('Product offerings', () => {
  const repository = new MongoProductOfferingRepository();
  const testDbHandler = new TestDbHandler();

  beforeAll(async () => {
    await testDbHandler.connect();
  });

  afterEach(async () => {
    await testDbHandler.clear();
  });

  afterAll(async () => {
    await testDbHandler.close();
  });

  test('Creates a product offering', async () => {
    const productOffering = {
      name: '[name]',
      description: '[description]',
      note: '[note]',
      expiration: new Date(420),
      category: '[category]',
    };

    await repository.create(productOffering);
    const result = await repository.getAll();

    expect(result).toMatchObject([productOffering]);
  });

  test('Gets all created product offerings', async () => {
    await repository.create({
      name: '[name]',
      description: '[description]',
      note: '[note]',
      expiration: new Date(420),
      category: '[category]',
    });
    await repository.create({
      name: '[name]',
      description: '[description]',
      note: '[note]',
      expiration: new Date(420),
      category: '[category]',
    });

    const result = await repository.getAll();

    expect(result.length).toStrictEqual(2);
  });
});
