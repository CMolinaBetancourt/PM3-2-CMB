"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Status = void 0;
// Para llamar el enum funciona como un objeto Status.active o Status.cancelled
var Status;
(function (Status) {
    Status["ACTIVE"] = "activa";
    Status["CANCELLED"] = "cancelada";
})(Status || (exports.Status = Status = {}));
