import { RepositoryCountry, RepositoryCountryCreate } from './repository.country.model';

type Id = string;

export interface CountryRepository {
  create(country: RepositoryCountryCreate): Promise<Id>;

  getAll(): Promise<RepositoryCountry[]>;
}
