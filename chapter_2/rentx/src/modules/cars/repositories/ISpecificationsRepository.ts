interface ICreateSpecificationsDTO {
  name: string;
  description: string;
}

interface ISpecificationsRepository {
  create({ description, name }: ICreateSpecificationsDTO): void;

  findByName(name: string);
}

export { ISpecificationsRepository, ICreateSpecificationsDTO };
