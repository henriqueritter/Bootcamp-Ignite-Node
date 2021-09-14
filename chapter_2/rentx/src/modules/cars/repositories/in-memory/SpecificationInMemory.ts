import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";

import {
  ICreateSpecificationsDTO,
  ISpecificationsRepository,
} from "../ISpecificationsRepository";

class SpecificationInMemory implements ISpecificationsRepository {
  specifications: Specification[] = [];

  create({ description, name }: ICreateSpecificationsDTO): Promise<void> {
    throw new Error("Method not implemented.");
  }
  findByName(name: string): Promise<any> {
    throw new Error("Method not implemented.");
  }
  findByIds(ids: string[]): Promise<any[]> {
    throw new Error("Method not implemented.");
  }
}

export { SpecificationInMemory };
