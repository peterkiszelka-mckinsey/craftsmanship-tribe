import { v4 as uuid } from 'uuid';
import { ProductOfferingRepository } from './repository.productOffering.interface';
import { RepositoryProductOffering, RepositoryProductOfferingCreate } from './repository.productOffering.model';

type Id = string;

export class FakeProductOfferingRepository implements ProductOfferingRepository {
  private readonly productOfferings: Map<Id, RepositoryProductOfferingCreate> = new Map();

  async create(productOffering: RepositoryProductOfferingCreate): Promise<Id> {
    const id = uuid();
    this.productOfferings.set(id, productOffering);

    return id;
  }

  async getAll(): Promise<RepositoryProductOffering[]> {
    return Array.from(this.productOfferings.entries()).map(([id, productOffering]) => ({ ...productOffering, id }));
  }
}
