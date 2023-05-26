export type ProductOffering = {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly note: string;
  readonly expiration: Date;
  readonly category: string;
  readonly subtitle: string;
  readonly price: number;
};

export type ProductOfferingCreate = {
  readonly name: string;
  readonly description: string;
  readonly note: string;
  readonly expiration: Date;
  readonly category: string;
  readonly subtitle: string;
  readonly price: number;
};

export type CountryCreate = {
  readonly name: string;
};
