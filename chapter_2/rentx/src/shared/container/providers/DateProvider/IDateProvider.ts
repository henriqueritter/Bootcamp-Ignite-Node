import { ICompareInHoursParams } from "./dtos/ICompareInHoursParams";

interface IDateProvider {
  compareInHours(data: ICompareInHoursParams): number;

  convertToUTC(date: Date): string;

  dateNow(): Date;
}

export { IDateProvider };
