import { MongoProductOfferingRepository } from '../../../../../productOffering/adapters/driven/mongo/repository/mongo.productOffering.repository';
import { createRepositoryProductOffering } from '../../../../../productOffering/domain/repository/repository.productOffering.model.fixtures';
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
    const productOffering = createRepositoryProductOffering({});

    await repository.create(productOffering);
    const result = await repository.getAll();

    expect(result).toMatchObject([productOffering]);
  });

  test('Gets all created product offerings', async () => {
    await repository.create(createRepositoryProductOffering({}));
    await repository.create(createRepositoryProductOffering({}));

    const result = await repository.getAll();

    expect(result.length).toStrictEqual(2);
  });
});
