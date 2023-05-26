import { CountryCreate, ProductOfferingCreate } from './productOffering.model';

export const createProductOffering = ({
  name = '[name]',
  description = '[description]',
  note = '[note]',
  expiration = new Date(420),
  category = '[category]',
  subtitle = '[subtitle]',
  price = 420,
}: {
  name?: string;
  description?: string;
  note?: string;
  expiration?: Date;
  category?: string;
  subtitle?: string;
  price?: number;
}): ProductOfferingCreate => {
  return { name, description, note, expiration, category, subtitle, price };
};

export const createCountry = ({ name = '[name]' }: { name?: string }): CountryCreate => {
  return { name };
};
