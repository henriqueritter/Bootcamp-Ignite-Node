"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRoutes = void 0;
var express_1 = require("express");
var multer_1 = __importDefault(require("multer"));
var upload_1 = __importDefault(require("@config/upload")); // arquivo de configuracao do multer
var CreateUserController_1 = require("@modules/accounts/useCases/createUser/CreateUserController");
var ProfileUserController_1 = require("@modules/accounts/useCases/profileUser/ProfileUserController");
var UpdateUserAvatarController_1 = require("@modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController");
var ensureAuthenticated_1 = require("@shared/infra/http/middlewares/ensureAuthenticated");
var usersRoutes = express_1.Router();
exports.usersRoutes = usersRoutes;
var uploadAvatar = multer_1.default(upload_1.default);
var createUserController = new CreateUserController_1.CreateUserController();
var updateUserAvatarController = new UpdateUserAvatarController_1.UpdateUserAvatarController();
var profileUserController = new ProfileUserController_1.ProfileUserController();
usersRoutes.post("/", createUserController.handle);
// update avatar
usersRoutes.patch("/avatar", ensureAuthenticated_1.ensureAuthenticated, uploadAvatar.single("avatar"), // middleware usando a configuracao de upload
updateUserAvatarController.handle);
usersRoutes.get("/profile", ensureAuthenticated_1.ensureAuthenticated, profileUserController.handle);
