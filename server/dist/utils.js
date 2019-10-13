"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function parseLsTreeLog(log) {
    var result = [];
    var entries = log.split('\n').filter(function (entry) { return !!entry; });
    entries.forEach(function (entry) {
        var name = entry.split('\t')[1];
        var type = entry.split(' ')[1];
        result.push({ name: name, type: type });
    });
    return result;
}
exports.parseLsTreeLog = parseLsTreeLog;
