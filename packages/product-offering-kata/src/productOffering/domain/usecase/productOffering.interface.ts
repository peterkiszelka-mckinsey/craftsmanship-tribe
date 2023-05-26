import { CountryCreate, ProductOffering, ProductOfferingCreate } from './productOffering.model';

type Id = string;

export interface ProductOfferingService {
  createProductOffering(productOffering: ProductOfferingCreate): Promise<Id>;

  getProductOfferingsByCountry(countryId: string): Promise<ProductOffering[]>;

  addCountry(country: CountryCreate): Promise<Id>;
}
