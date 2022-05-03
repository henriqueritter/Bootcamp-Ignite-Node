"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dayjs_1 = __importDefault(require("dayjs"));
var CarsRepositoryInMemory_1 = require("@modules/cars/repositories/in-memory/CarsRepositoryInMemory");
var RentalsRepositoryInMemory_1 = require("@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory");
var DayjsDateProvider_1 = require("@shared/container/providers/DateProvider/implementations/DayjsDateProvider");
var AppError_1 = require("@shared/errors/AppError");
var CreateRentalUseCase_1 = require("./CreateRentalUseCase");
var createRentalUseCase;
var rentalsRepositoryInMemory;
var carsRepositoryInMemory;
var dayjsDateProvider;
describe("Create Rental", function () {
    var dayAdd24Hours = dayjs_1.default().add(1, "day").toDate();
    var carExample;
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    dayjsDateProvider = new DayjsDateProvider_1.DayjsDateProvider();
                    rentalsRepositoryInMemory = new RentalsRepositoryInMemory_1.RentalsRepositoryInMemory();
                    carsRepositoryInMemory = new CarsRepositoryInMemory_1.CarsRepositoryInMemory();
                    createRentalUseCase = new CreateRentalUseCase_1.CreateRentalUseCase(rentalsRepositoryInMemory, carsRepositoryInMemory, dayjsDateProvider);
                    return [4 /*yield*/, carsRepositoryInMemory.create({
                            name: "Impreza",
                            brand: "Subaru",
                            category_id: "1234",
                            daily_rate: 150,
                            description: "Vermelho",
                            fine_amount: 20,
                            license_plate: "HRQ1234",
                        })];
                case 1:
                    carExample = _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it("should be able to create a new rental", function () { return __awaiter(void 0, void 0, void 0, function () {
        var rental;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, createRentalUseCase.execute({
                        user_id: "1234",
                        car_id: carExample.id,
                        expected_return_date: dayAdd24Hours,
                    })];
                case 1:
                    rental = _a.sent();
                    expect(rental).toHaveProperty("id");
                    expect(rental).toHaveProperty("start_date");
                    return [2 /*return*/];
            }
        });
    }); });
    it("should not be able to create a new rental if there is another open rent to the same user", function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: 
                // alguel duplicado para test
                return [4 /*yield*/, createRentalUseCase.execute({
                        user_id: "1234",
                        car_id: carExample.id,
                        expected_return_date: dayAdd24Hours,
                    })];
                case 1:
                    // alguel duplicado para test
                    _a.sent();
                    return [4 /*yield*/, expect(createRentalUseCase.execute({
                            user_id: "1234",
                            car_id: carExample.id,
                            expected_return_date: dayAdd24Hours,
                        })).rejects.toEqual(new AppError_1.AppError("Car is unavailable."))];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it("should not be able to create a new rental if there is another open rent to the same car", function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: 
                // alguel duplicado para test
                return [4 /*yield*/, createRentalUseCase.execute({
                        user_id: "123",
                        car_id: carExample.id,
                        expected_return_date: dayAdd24Hours,
                    })];
                case 1:
                    // alguel duplicado para test
                    _a.sent();
                    return [4 /*yield*/, expect(createRentalUseCase.execute({
                            user_id: "321",
                            car_id: carExample.id,
                            expected_return_date: dayAdd24Hours,
                        })).rejects.toEqual(new AppError_1.AppError("Car is unavailable."))];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it("should not be able to create a new rental with invalid return time", function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: 
                // alguel duplicado para test
                return [4 /*yield*/, expect(createRentalUseCase.execute({
                        user_id: "123",
                        car_id: carExample.id,
                        expected_return_date: dayjs_1.default().toDate(),
                    })).rejects.toEqual(new AppError_1.AppError("Invalid return time."))];
                case 1:
                    // alguel duplicado para test
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
