import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { ICompareInDays } from "../dtos/ICompareInDaysParams";
import { ICompareInHoursParams } from "../dtos/ICompareInHoursParams";
import { IDateProvider } from "../IDateProvider";

dayjs.extend(utc);

class DayjsDateProvider implements IDateProvider {
  // retorna data atual
  dateNow(): Date {
    return dayjs().toDate();
  }

  // converte para UTC
  convertToUTC(date: Date): string {
    return dayjs(date).utc().local().format();
  }

  // retorna em horas a diff entre duas  datas
  compareInHours({ start_date, end_date }: ICompareInHoursParams): number {
    const end_date_utc = this.convertToUTC(end_date);
    const start_date_utc = this.convertToUTC(start_date);
    return dayjs(end_date_utc).diff(start_date_utc, "hours");
  }

  // retorna diferença em dias
  compareInDays({ start_date, end_date }: ICompareInDays): number {
    const start_date_utc = this.convertToUTC(start_date);
    const end_date_utc = this.convertToUTC(end_date);

    return dayjs(end_date_utc).diff(start_date_utc, "days");
  }
}

export { DayjsDateProvider };
