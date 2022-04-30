import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/upload"; // arquivo de configuracao do multer
import { CreateUserController } from "@modules/accounts/useCases/createUser/CreateUserController";
import { ProfileUserController } from "@modules/accounts/useCases/profileUser/ProfileUserController";
import { UpdateUserAvatarController } from "@modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";

const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig);

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();
const profileUserController = new ProfileUserController();

usersRoutes.post("/", createUserController.handle);

// update avatar
usersRoutes.patch(
  "/avatar",
  ensureAuthenticated,
  uploadAvatar.single("avatar"), // middleware usando a configuracao de upload
  updateUserAvatarController.handle
);

usersRoutes.get("/profile", ensureAuthenticated, profileUserController.handle);

export { usersRoutes };
