import { Router } from "express";
import multer from "multer";

import uploadConfig from "../config/upload"; // arquivo de configuracao do multer
import { CreateUserController } from "../modules/accounts/useCases/createUser/CreateUserController";
import { UpdateUserAvatarController } from "../modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";

const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"));

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

usersRoutes.post("/", createUserController.handle);

// update avatar
usersRoutes.patch(
  "/avatar",
  uploadAvatar.single("avatar"), // middleware usando a configuracao de upload
  updateUserAvatarController.handle
);

export { usersRoutes };
