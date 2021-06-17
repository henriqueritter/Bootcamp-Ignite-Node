/**
 * name - string
 * durantion - number (weeks)
 * educator - string
 */
interface ICourse {
  name: string;
  duration: number;
  educator?: string;
}

class CreateCourseService {
  execute({ name, duration, educator = "Henrique" }: ICourse) {
    console.log(name, duration, educator);
  }
}

export default new CreateCourseService();
