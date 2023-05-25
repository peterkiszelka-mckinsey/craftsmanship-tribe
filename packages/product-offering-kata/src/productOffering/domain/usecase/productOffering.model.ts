export type ProductOffering = {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly note: string;
  readonly expiration: Date;
  readonly category: string;
};

export type ProductOfferingCreate = {
  readonly name: string;
  readonly description: string;
  readonly note: string;
  readonly expiration: Date;
  readonly category: string;
};

export type Country = {
  readonly name: string;
};
