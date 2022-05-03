"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DayjsDateProvider = void 0;
var dayjs_1 = __importDefault(require("dayjs"));
var utc_1 = __importDefault(require("dayjs/plugin/utc"));
dayjs_1.default.extend(utc_1.default);
var DayjsDateProvider = /** @class */ (function () {
    function DayjsDateProvider() {
    }
    // retorna data atual
    DayjsDateProvider.prototype.dateNow = function () {
        return dayjs_1.default().toDate();
    };
    // converte para UTC
    DayjsDateProvider.prototype.convertToUTC = function (date) {
        return dayjs_1.default(date).utc().local().format();
    };
    // retorna em horas a diff entre duas  datas
    DayjsDateProvider.prototype.compareInHours = function (_a) {
        var start_date = _a.start_date, end_date = _a.end_date;
        var end_date_utc = this.convertToUTC(end_date);
        var start_date_utc = this.convertToUTC(start_date);
        return dayjs_1.default(end_date_utc).diff(start_date_utc, "hours");
    };
    // retorna diferença em dias
    DayjsDateProvider.prototype.compareInDays = function (_a) {
        var start_date = _a.start_date, end_date = _a.end_date;
        var start_date_utc = this.convertToUTC(start_date);
        var end_date_utc = this.convertToUTC(end_date);
        return dayjs_1.default(end_date_utc).diff(start_date_utc, "days");
    };
    // retorna a data atual + n dias
    DayjsDateProvider.prototype.addDays = function (days) {
        return dayjs_1.default().add(days, "days").toDate();
    };
    // retorna a data:hora atual + n horas
    DayjsDateProvider.prototype.addHours = function (hours) {
        return dayjs_1.default().add(hours, "hours").toDate();
    };
    // usado para verificar a data de validado do token de reset
    DayjsDateProvider.prototype.compareIfBefore = function (start_date, end_date) {
        return dayjs_1.default(start_date).isBefore(end_date);
    };
    return DayjsDateProvider;
}());
exports.DayjsDateProvider = DayjsDateProvider;
