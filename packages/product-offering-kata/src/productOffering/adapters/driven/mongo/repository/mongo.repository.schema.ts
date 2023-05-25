import mongoose, { Schema } from 'mongoose';
import { RepositoryCountry } from '../../../../domain/repository/repository.country.model';
import { RepositoryProductOffering } from '../../../../domain/repository/repository.productOffering.model';

export const CountrySchema = new Schema<RepositoryCountry>({
  name: { type: String, required: true },
});

export const ProductOfferingSchema = new Schema<RepositoryProductOffering>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  note: { type: String, required: true },
  expiration: { type: Date, required: true },
  category: { type: String, required: true },
});

export const CountryModel = mongoose.model('RepositoryCountry', CountrySchema);
export const ProductOfferingModel = mongoose.model('RepositoryProductOffering', ProductOfferingSchema);
