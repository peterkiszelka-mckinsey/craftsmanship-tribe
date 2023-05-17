export type ProductOffering = {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly note: string;
  readonly expiration: Date;
};

export type ProductOfferingCreate = {
  readonly name: string;
  readonly description: string;
  readonly note: string;
  readonly expiration: Date;
};

export type Country = {
  readonly name: string;
};
