export type RepositoryProductOffering = {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly note: string;
  readonly expiration: Date;
  readonly category: string;
  readonly subtitle: string;
};

export type RepositoryProductOfferingCreate = {
  readonly name: string;
  readonly description: string;
  readonly note: string;
  readonly expiration: Date;
  readonly category: string;
  readonly subtitle: string;
};
