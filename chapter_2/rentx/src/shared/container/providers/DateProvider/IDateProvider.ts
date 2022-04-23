import { ICompareInDays } from "./dtos/ICompareInDaysParams";
import { ICompareInHoursParams } from "./dtos/ICompareInHoursParams";

interface IDateProvider {
  compareInHours(data: ICompareInHoursParams): number;

  compareInDays(data: ICompareInDays): number;

  convertToUTC(date: Date): string;

  dateNow(): Date;

  addDays(days: number): Date;

  addHours(hours: number): Date;

  compareIfBefore(start_date: Date, end_date: Date): boolean;
}

export { IDateProvider };
