"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var InstrumentHelper_1 = require("./helpers/InstrumentHelper");
var ensureCapacitorPlatformArg = function (context) {
    var hasCapArg = process.argv.some(function (arg) { return arg.indexOf('--capacitor=') === 0; });
    if (hasCapArg) {
        return;
    }
    if (process.env.CAPACITOR_PLATFORM) {
        process.argv.push("--capacitor=".concat(process.env.CAPACITOR_PLATFORM));
        return;
    }
    if (context && context.opts && context.opts.platforms && context.opts.platforms.length > 0) {
        process.argv.push("--capacitor=".concat(context.opts.platforms[0]));
    }
};
module.exports = (function (context) { return new Promise(function (resolve) {
    ensureCapacitorPlatformArg(context);
    (0, InstrumentHelper_1.instrument)(process).then(function () {
        resolve('');
    });
}); })();
