import { CountryRepository } from '../../../../domain/repository/repository.country.interface';
import { RepositoryCountry, RepositoryCountryCreate } from '../../../../domain/repository/repository.country.model';
import { CountryModel } from './mongo.repository.schema';

type Id = string;

export class MongoCountryRepository implements CountryRepository {
  async create(country: RepositoryCountryCreate): Promise<Id> {
    const created = await CountryModel.create(country);

    return created.id;
  }

  async getAll(): Promise<RepositoryCountry[]> {
    return CountryModel.find();
  }
}
