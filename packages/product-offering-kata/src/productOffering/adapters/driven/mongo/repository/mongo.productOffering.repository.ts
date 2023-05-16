import { ProductOfferingRepository } from '../../../../domain/repository/repository.productOffering.interface';
import {
  RepositoryProductOffering,
  RepositoryProductOfferingCreate,
} from '../../../../domain/repository/repository.productOffering.model';
import { ProductOfferingModel } from './mongo.repository.schema';

type Id = string;

export class MongoProductOfferingRepository implements ProductOfferingRepository {
  async create(productOffering: RepositoryProductOfferingCreate): Promise<Id> {
    const created = await ProductOfferingModel.create(productOffering);

    return created.id;
  }

  async getAll(): Promise<RepositoryProductOffering[]> {
    return ProductOfferingModel.find();
  }
}
