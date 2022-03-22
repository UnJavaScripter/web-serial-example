/**
 * If you're not familiar with TypeScript code, just ignore the `<TYPE>` and `:TYPE` parts.
 */
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
var SerialHandler = /** @class */ (function () {
    function SerialHandler() {
        this.encoder = new TextEncoder();
        this.decoder = new TextDecoder();
    }
    /**
     * Triggers the menu where the user will pick a device (it requires an user interaction to be triggered).
     * Opens the port selected by the user in the UI using a defined `baudRate`; this example uses a hard-coded value of 9600.
     * After opening the port, a `writer` and a `reader` are set; they will be used by the `write` and `read` methods respectively.
     */
    SerialHandler.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var port, signals, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!('serial' in navigator)) return [3 /*break*/, 7];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        return [4 /*yield*/, navigator.serial.requestPort()];
                    case 2:
                        port = _a.sent();
                        return [4 /*yield*/, port.open({ baudRate: 9600 })];
                    case 3:
                        _a.sent(); // `baudRate` was `baudrate` in previous versions.
                        this.writer = port.writable.getWriter();
                        this.reader = port.readable.getReader();
                        return [4 /*yield*/, port.getSignals()];
                    case 4:
                        signals = _a.sent();
                        console.log(signals);
                        return [3 /*break*/, 6];
                    case 5:
                        err_1 = _a.sent();
                        console.error('There was an error opening the serial port:', err_1);
                        return [3 /*break*/, 6];
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        console.error('Web serial doesn\'t seem to be enabled in your browser. Check https://developer.mozilla.org/en-US/docs/Web/API/Web_Serial_API#browser_compatibility for more info.');
                        _a.label = 8;
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Takes a string of data, encodes it and then writes it using the `writer` attached to the serial port.
     * @param data - A string of data that will be sent to the Serial port.
     * @returns An empty promise after the message has been written.
     */
    SerialHandler.prototype.write = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var dataArrayBuffer;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dataArrayBuffer = this.encoder.encode(data);
                        return [4 /*yield*/, this.writer.write(dataArrayBuffer)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Gets data from the `reader`, decodes it and returns it inside a promise.
     * @returns A promise containing either the message from the `reader` or an error.
     */
    SerialHandler.prototype.read = function () {
        return __awaiter(this, void 0, void 0, function () {
            var readerData, err_2, errorMessage;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.reader.read()];
                    case 1:
                        readerData = _a.sent();
                        return [2 /*return*/, this.decoder.decode(readerData.value)];
                    case 2:
                        err_2 = _a.sent();
                        errorMessage = "error reading data: " + err_2;
                        console.error(errorMessage);
                        return [2 /*return*/, errorMessage];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return SerialHandler;
}());
export var serialHandler = new SerialHandler();
