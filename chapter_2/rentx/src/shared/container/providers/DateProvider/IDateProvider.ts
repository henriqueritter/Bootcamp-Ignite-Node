import { ICompareInDays } from "./dtos/ICompareInDaysParams";
import { ICompareInHoursParams } from "./dtos/ICompareInHoursParams";

interface IDateProvider {
  compareInHours(data: ICompareInHoursParams): number;

  compareInDays(data: ICompareInDays): number;

  convertToUTC(date: Date): string;

  dateNow(): Date;

  addDays(days: number): Date;
}

export { IDateProvider };
