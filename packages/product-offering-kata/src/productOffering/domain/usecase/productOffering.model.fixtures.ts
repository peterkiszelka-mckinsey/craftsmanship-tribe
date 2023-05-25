import { ProductOfferingCreate } from './productOffering.model';

export const createProductOffering = ({
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
}): ProductOfferingCreate => {
  return { name, description, note, expiration, category, subtitle };
};
