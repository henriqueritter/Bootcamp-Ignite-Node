import { inject, injectable } from "tsyringe";

import { ICarsImageRepository } from "@modules/cars/repositories/ICarsImagesRepository";

interface IRequest {
  car_id: string;
  images_name: string[];
}

@injectable()
class UploadCarImagesUseCase {
  constructor(
    @inject("CarsImagesRepository")
    private carsImagesRepository: ICarsImageRepository
  ) { }
  // recebe array de paths das images
  async execute({ car_id, images_name }: IRequest): Promise<void> {
    // pra cada imagem salva no banco
    images_name.map(async (image_name) => {
      await this.carsImagesRepository.create(car_id, image_name);
    });
  }
}

export { UploadCarImagesUseCase };
