import { CountryRepository } from '../../../productOffering/domain/repository/repository.country.interface';
import { FakeCountryRepository } from '../../../productOffering/domain/repository/repository.country.interface.fake';
import { ProductOfferingRepository } from '../../../productOffering/domain/repository/repository.productOffering.interface';
import { FakeProductOfferingRepository } from '../../../productOffering/domain/repository/repository.productOffering.interface.fake';
import {
  createCountry,
  createProductOffering,
} from '../../../productOffering/domain/usecase/productOffering.model.fixtures';
import { DomainProductOfferingService } from '../../../productOffering/domain/usecase/productOffering.service';

describe('Get product offerings by country', () => {
  let service: DomainProductOfferingService;
  let productOfferingRepository: ProductOfferingRepository;
  let countryRepository: CountryRepository;

  beforeEach(() => {
    productOfferingRepository = new FakeProductOfferingRepository();
    countryRepository = new FakeCountryRepository();
    service = new DomainProductOfferingService(productOfferingRepository, countryRepository);
  });

  test('Returns nothing when no product offering found', async () => {
    const countryId = await service.addCountry(createCountry({}));

    const result = await service.getProductOfferingsByCountry(countryId);

    expect(result).toStrictEqual([]);
  });

  test('Returns product offerings when there is a matched country', async () => {
    const productOffering = createProductOffering({});
    await service.createProductOffering(productOffering);
    const countryId = await service.addCountry(createCountry({}));

    const result = await service.getProductOfferingsByCountry(countryId);

    expect(result).toMatchObject([productOffering]);
  });

  test('Returns nothing when no country found', async () => {
    await service.createProductOffering(createProductOffering({}));

    const result = await service.getProductOfferingsByCountry('[country-id]');

    expect(result).toStrictEqual([]);
  });

  test('Returns nothing when only irrelevant country found', async () => {
    await service.createProductOffering(createProductOffering({}));
    await service.addCountry(createCountry({}));

    const result = await service.getProductOfferingsByCountry('[another-country-id]');

    expect(result).toStrictEqual([]);
  });
});
