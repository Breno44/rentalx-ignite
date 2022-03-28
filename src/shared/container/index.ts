import { container } from "tsyringe";

import { ICategoriesRepository } from "../../modules/cars/repositories/ICategoriesRepository";
import { CategoriesRepository } from "../../modules/cars/infra/typeorm/repositories/CategoriesRepository";
import { ISpecificationRepository } from "../../modules/cars/repositories/ISpecificationsRepository";
import { IUsersRepository } from "../../modules/accounts/repositories/IUsersRepository";
import { UsersRepository } from "../../modules/accounts/infra/typeorm/repositories/UsersRepository";
import { SpecificationRepository } from "../../modules/cars/infra/typeorm/repositories/SpecificationRepository";
import { ICarsRepository } from "../../modules/cars/repositories/ICarsRepository";
import { CarsRepository } from "../../modules/cars/infra/typeorm/repositories/CarsRepository";

container.registerSingleton<ICategoriesRepository>(
  "CategoriesRepository",
  CategoriesRepository
);

container.registerSingleton<ISpecificationRepository>(
  "SpecificationRepository",
  SpecificationRepository
);

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);

container.registerSingleton<ICarsRepository>("CarsRepository", CarsRepository);
