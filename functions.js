"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getName = exports.introduce = exports.fetchData = exports.printFormat = exports.format = exports.addString = exports.addNumbers = void 0;
function addNumbers(a, b) {
    return a + b;
}
exports.addNumbers = addNumbers;
var addString = function (str1, str2) {
    if (str2 === void 0) { str2 = ''; }
    return "".concat(str1, " ").concat(str2, "}");
};
exports.addString = addString;
var format = function (title, param) { return "".concat(title, " ").concat(param); };
exports.format = format;
// A function that returns nothing has a return type of void
var printFormat = function (title, param) { return console.log(format(title, param)); };
exports.printFormat = printFormat;
// how we can return promise that can resolve into string
var fetchData = function (url) { return Promise.resolve("Data from ".concat(url)); };
exports.fetchData = fetchData;
// how we can give types to the rest operator
var introduce = function (salutation) {
    var names = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        names[_i - 1] = arguments[_i];
    }
    return "".concat(salutation, " ").concat(names.join(' '));
};
exports.introduce = introduce;
// Q: when types are enforce with typescript
// Ans: Typescript only enforce types at compile-time not run-time 
var getName = function (user) {
    return "".concat(user.first, " ").concat(user.last);
};
exports.getName = getName;
