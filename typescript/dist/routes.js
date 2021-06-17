"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCourse = void 0;
var CreateCourseService_1 = __importDefault(require("./CreateCourseService"));
function createCourse(request, response) {
    var course = {
        name: "Node",
        duration: 10,
        educator: "dan",
    };
    CreateCourseService_1.default.execute(course);
    //outra forma seria, a ordem não importa
    CreateCourseService_1.default.execute({
        duration: 8,
        name: "React",
        // educator: "Diego",
    });
    return response.send();
}
exports.createCourse = createCourse;
