import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarRepositoriesinMemory";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory
    );
  });

  it("should be able to list all available cars", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car1",
      description: "Description Car",
      daily_rate: 100,
      license_plate: "DEF-1234",
      fine_amount: 60,
      brand: "Car_brand",
      category_id: "category_id",
    });

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by brand", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car3",
      description: "Description Car",
      daily_rate: 100,
      license_plate: "DEF-1434",
      fine_amount: 60,
      brand: "Car_brand",
      category_id: "category_id",
    });

    const cars = await listAvailableCarsUseCase.execute({
      name: "Car3",
    });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car2",
      description: "Description Car",
      daily_rate: 100,
      license_plate: "DEF-1234",
      fine_amount: 60,
      brand: "Car_brand_test",
      category_id: "category_id",
    });

    const cars = await listAvailableCarsUseCase.execute({
      brand: "Car_brand_test",
    });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car4",
      description: "Description Car",
      daily_rate: 100,
      license_plate: "DEF-1234",
      fine_amount: 60,
      brand: "Car_brand_test",
      category_id: "123423",
    });

    const cars = await listAvailableCarsUseCase.execute({
      category_id: "123423",
    });

    expect(cars).toEqual([car]);
  });
});
