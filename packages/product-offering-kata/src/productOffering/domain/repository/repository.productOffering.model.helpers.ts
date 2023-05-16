import { RepositoryProductOfferingCreate } from './repository.productOffering.model';

export const createRepositoryProductOffering = ({
  name = '[name]',
  description = '[description]',
  note = '[note]',
  expiration = new Date(420),
}: {
  name?: string;
  description?: string;
  note?: string;
  expiration?: Date;
}): RepositoryProductOfferingCreate => ({ name, description, note, expiration });
