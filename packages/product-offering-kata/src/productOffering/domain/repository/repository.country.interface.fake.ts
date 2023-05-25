import { v4 as uuid } from 'uuid';
import { CountryRepository } from './repository.country.interface';
import { RepositoryCountry, RepositoryCountryCreate } from './repository.country.model';

type Id = string;

export class FakeCountryRepository implements CountryRepository {
  private readonly countries: Map<Id, RepositoryCountryCreate> = new Map();

  async create(country: RepositoryCountryCreate): Promise<Id> {
    const id = uuid();
    this.countries.set(id, country);

    return id;
  }

  async getAll(): Promise<RepositoryCountry[]> {
    return Array.from(this.countries.entries()).map(([id, country]) => ({ ...country, id }));
  }
}
