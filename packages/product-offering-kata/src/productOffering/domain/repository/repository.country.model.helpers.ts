import { RepositoryCountryCreate } from './repository.country.model';

export const createRepositoryCountry = ({ name = '[name]' }: { name?: string }): RepositoryCountryCreate => ({ name });
