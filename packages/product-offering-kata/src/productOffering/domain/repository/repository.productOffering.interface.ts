import { RepositoryProductOffering, RepositoryProductOfferingCreate } from './repository.productOffering.model';

type Id = string;

export interface ProductOfferingRepository {
  create(productOffering: RepositoryProductOfferingCreate): Promise<Id>;

  getAll(): Promise<RepositoryProductOffering[]>;
}
