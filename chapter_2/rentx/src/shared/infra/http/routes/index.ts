import { Router } from "express";

import { authenticateRoutes } from "./authenticate.routes";
import { carsRoutes } from "./cars.routes";
import { categoriesRoutes } from "./categories.routes";
import { rentalRoutes } from "./rental.routes";
import { specificationsRoutes } from "./specifications.routes";
import { usersRoutes } from "./users.routes";

const router = Router();

router.use("/cars", carsRoutes);
router.use("/categories", categoriesRoutes);
router.use("/specifications", specificationsRoutes);

router.use("/users", usersRoutes);

router.use("/rentals", rentalRoutes);

router.use(authenticateRoutes); // a rota será localhost:3333/sessions
export { router };
