import { CountryRepository } from '../repository/repository.country.interface';
import { ProductOfferingRepository } from '../repository/repository.productOffering.interface';
import { ProductOfferingService } from './productOffering.interface';
import { Country, ProductOffering, ProductOfferingPartial } from './productOffering.model';

type Id = string;

export class DomainProductOfferingService implements ProductOfferingService {
  constructor(
    private readonly productOfferingRepository: ProductOfferingRepository,
    private readonly countryRepository: CountryRepository,
  ) {}

  async createProductOffering(productOffering: ProductOfferingPartial): Promise<Id> {
    return await this.productOfferingRepository.create(productOffering);
  }

  async getProductOfferingsByCountry(countryId: string): Promise<ProductOffering[]> {
    const countries = await this.countryRepository.getAll();
    const countryExists = countries.map(country => country.id).some(id => id === countryId);

    if (!countryExists) {
      return [];
    }

    return await this.productOfferingRepository.getAll();
  }

  async addCountry(country: Country): Promise<Id> {
    return await this.countryRepository.create(country);
  }
}
