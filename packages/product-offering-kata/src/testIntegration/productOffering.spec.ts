import { MongoCountryRepository } from '../productOffering/adapters/driven/mongo/repository/mongo.country.repository';
import { MongoProductOfferingRepository } from '../productOffering/adapters/driven/mongo/repository/mongo.productOffering.repository';
import { createProductOffering } from '../productOffering/domain/usecase/productOffering.model.fixtures';
import { DomainProductOfferingService } from '../productOffering/domain/usecase/productOffering.service';
import { TestDbHandler } from '../testDbHandler';

describe('Product offering integration tests', () => {
  const productOfferingRepository = new MongoProductOfferingRepository();
  const countryRepository = new MongoCountryRepository();
  const service = new DomainProductOfferingService(productOfferingRepository, countryRepository);
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

  test('Getting product offerings by country results in an empty response when no matching countries exist', async () => {
    await service.createProductOffering(createProductOffering({}));

    const result = await service.getProductOfferingsByCountry('[country-id]');

    expect(result).toStrictEqual([]);
  });

  test('Getting product offerings by country results in the created product offering', async () => {
    const productOffering = createProductOffering({});
    const productOfferingId = await service.createProductOffering(productOffering);
    const countryId = await service.addCountry({ name: '[country-name]' });

    const result = await service.getProductOfferingsByCountry(countryId);

    expect(result).toMatchObject([{ ...productOffering, id: productOfferingId }]);
  });
});
