import { RepositoryProductOfferingCreate } from './repository.productOffering.model';

export const createRepositoryProductOffering = ({
  name = '[name]',
  description = '[description]',
  note = '[note]',
  expiration = new Date(420),
  category = '[category]',
  subtitle = '[subtitle]',
}: {
  name?: string;
  description?: string;
  note?: string;
  expiration?: Date;
  category?: string;
  subtitle?: string;
}): RepositoryProductOfferingCreate => {
  return { name, description, note, expiration, category, subtitle };
};
