import { Request, Response } from "express";
import CreateCourseService from "./CreateCourseService";

export function createCourse(request: Request, response: Response) {
  const course = {
    name: "Node",
    duration: 10,
    educator: "dan",
  };
  CreateCourseService.execute(course);

  //outra forma seria, a ordem não importa
  CreateCourseService.execute({
    duration: 8,
    name: "React",
    // educator: "Diego",
  });

  return response.send();
}
