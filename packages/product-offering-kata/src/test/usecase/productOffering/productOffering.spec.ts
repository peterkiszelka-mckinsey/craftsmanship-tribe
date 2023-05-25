import { anything, instance, mock, verify, when } from 'ts-mockito';
import { MongoCountryRepository } from '../../../productOffering/adapters/driven/mongo/repository/mongo.country.repository';
import { CountryRepository } from '../../../productOffering/domain/repository/repository.country.interface';
import { ProductOfferingRepository } from '../../../productOffering/domain/repository/repository.productOffering.interface';
import { DomainProductOfferingService } from '../../../productOffering/domain/usecase/productOffering.service';

describe('Create product offerings', () => {
  let service: DomainProductOfferingService;
  let productOfferingRepository: ProductOfferingRepository;
  let countryRepository: CountryRepository;

  beforeEach(() => {
    productOfferingRepository = mock<ProductOfferingRepository>();
    countryRepository = mock<MongoCountryRepository>();
    service = new DomainProductOfferingService(instance(productOfferingRepository), instance(countryRepository));
  });

  test('Creates a product offering', async () => {
    const productOffering = {
      name: '[name]',
      description: '[description]',
      note: '[note]',
      expiration: new Date(420),
      category: '[category]',
    };

    await service.createProductOffering(productOffering);

    await verify(productOfferingRepository.create(productOffering)).called();
  });
});

describe('Get product offerings by country', () => {
  let service: DomainProductOfferingService;
  let productOfferingRepository: ProductOfferingRepository;
  let countryRepository: CountryRepository;

  beforeEach(() => {
    productOfferingRepository = mock<ProductOfferingRepository>();
    countryRepository = mock<CountryRepository>();
    service = new DomainProductOfferingService(instance(productOfferingRepository), instance(countryRepository));

    when(productOfferingRepository.create(anything())).thenResolve('[created-id]');
  });

  test('Returns nothing when no product offering found', async () => {
    const countryId = '[country-id]';
    when(productOfferingRepository.getAll()).thenResolve([]);
    when(countryRepository.getAll()).thenResolve([{ id: countryId, name: '[name]' }]);

    const result = await service.getProductOfferingsByCountry(countryId);

    expect(result).toStrictEqual([]);
  });

  test('Returns product offerings when there is a matched country', async () => {
    const countryId = '[country-id]';
    const productOffering = {
      id: '[id]',
      name: '[name]',
      description: '[description]',
      note: '[note]',
      expiration: new Date(420),
      category: '[category]',
    };
    when(productOfferingRepository.getAll()).thenResolve([productOffering]);
    when(countryRepository.getAll()).thenResolve([{ id: countryId, name: '[name]' }]);

    const result = await service.getProductOfferingsByCountry(countryId);

    expect(result).toMatchObject([productOffering]);
  });

  test('Returns nothing when no country found', async () => {
    when(productOfferingRepository.getAll()).thenResolve([
      {
        id: '[id]',
        name: '[name]',
        description: '[description]',
        note: '[note]',
        expiration: new Date(420),
        category: '[category]',
      },
    ]);
    when(countryRepository.getAll()).thenResolve([]);

    const result = await service.getProductOfferingsByCountry('[country-id]');

    expect(result).toStrictEqual([]);
  });

  test('Returns nothing when only irrelevant country found', async () => {
    when(productOfferingRepository.getAll()).thenResolve([
      {
        id: '[id]',
        name: '[name]',
        description: '[description]',
        note: '[note]',
        expiration: new Date(420),
        category: '[category]',
      },
    ]);
    when(countryRepository.getAll()).thenResolve([{ id: '[another-country-id]', name: '[name]' }]);

    const result = await service.getProductOfferingsByCountry('[country-id]');

    expect(result).toStrictEqual([]);
  });
});

describe('Add country', () => {
  let service: DomainProductOfferingService;
  let productOfferingRepository: ProductOfferingRepository;
  let countryRepository: CountryRepository;

  beforeEach(() => {
    productOfferingRepository = mock<ProductOfferingRepository>();
    countryRepository = mock<CountryRepository>();
    service = new DomainProductOfferingService(instance(productOfferingRepository), instance(countryRepository));
  });

  test('Creates a country', async () => {
    const country = { name: '[name]' };

    await service.addCountry(country);

    verify(countryRepository.create(country)).called();
  });

  test('Creating a country results in the created id', async () => {
    const id = '[id]';
    when(countryRepository.create(anything())).thenResolve(id);

    const result = await service.addCountry({ name: '[name]' });

    expect(result).toStrictEqual(id);
  });
});
