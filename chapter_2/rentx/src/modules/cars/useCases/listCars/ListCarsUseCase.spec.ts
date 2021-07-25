import { ListCarsUseCase } from "./ListCarsUseCase";

let listCarsUseCase: ListCarsUseCase;
describe("List Cars", () => {
  beforeEach(() => {
    listCarsUseCase = new ListCarsUseCase();
  });
  it("should be able to list all available cars", async () => {
    await listCarsUseCase.execute();
  });
});
