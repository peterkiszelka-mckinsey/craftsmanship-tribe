import { MongoCountryRepository } from '../../../../../productOffering/adapters/driven/mongo/repository/mongo.country.repository';
import { TestDbHandler } from '../../../../../testDbHandler';

describe('Countries', () => {
  const repository = new MongoCountryRepository();
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

  test('Creates a name country', async () => {
    const country = { name: '[name]' };

    await repository.create(country);
    const result = await repository.getAll();

    expect(result).toMatchObject([country]);
  });

  test('Gets all created countries', async () => {
    await repository.create({ name: '[name]' });
    await repository.create({ name: '[name]' });

    const result = await repository.getAll();

    expect(result.length).toStrictEqual(2);
  });
});
