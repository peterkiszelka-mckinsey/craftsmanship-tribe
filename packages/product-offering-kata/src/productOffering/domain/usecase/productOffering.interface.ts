import { Country, ProductOffering, ProductOfferingPartial } from './productOffering.model';

type Id = string;

export interface ProductOfferingService {
  createProductOffering(productOffering: ProductOfferingPartial): Promise<Id>;

  getProductOfferingsByCountry(countryId: string): Promise<ProductOffering[]>;

  addCountry(country: Country): Promise<Id>;
}
