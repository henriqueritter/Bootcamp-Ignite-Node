"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMap = void 0;
var class_transformer_1 = require("class-transformer");
var UserMap = /** @class */ (function () {
    function UserMap() {
    }
    // serve para quando chamar o toDTO nao precisemos fazer um new UserMap e sim direto UserMap.toDTO
    UserMap.toDTO = function (_a) {
        var id = _a.id, email = _a.email, name = _a.name, avatar = _a.avatar, driver_license = _a.driver_license, avatar_url = _a.avatar_url;
        var user = class_transformer_1.instanceToInstance({
            id: id,
            email: email,
            name: name,
            avatar: avatar,
            driver_license: driver_license,
            avatar_url: avatar_url,
        });
        return user;
    };
    return UserMap;
}());
exports.UserMap = UserMap;
