import { ICreateCarDTO } from "../dtos/ICreatecarDTO";

interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<void>;
}
export { ICarsRepository };
