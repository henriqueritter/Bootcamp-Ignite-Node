import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";

import {
  ICreateSpecificationsDTO,
  ISpecificationsRepository,
} from "../ISpecificationsRepository";

class SpecificationInMemory implements ISpecificationsRepository {
  specifications: Specification[] = [];

  async create({ description, name }: ICreateSpecificationsDTO): Promise<void> {
    const specification = new Specification();

    Object.assign(Specification, {
      description,
      name,
    });
    this.specifications.push(specification);
  }

  async findByName(name: string): Promise<Specification> {
    const specification = this.specifications.find(
      (specification) => specification.name === name
    );
    return specification;
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    const allSpecifications = this.specifications.filter((specification) =>
      ids.includes(specification.id)
    );

    return allSpecifications;
  }
}

export { SpecificationInMemory };
