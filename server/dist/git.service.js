"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var fs_extra_1 = __importDefault(require("fs-extra"));
var child_process_1 = __importDefault(require("child_process"));
var path_1 = require("path");
var util_1 = require("util");
var utils_1 = require("./utils");
var promisifiedReadDir = util_1.promisify(fs_1.default.readdir);
var getRepoList = function (dirPath) { return promisifiedReadDir(dirPath, 'utf8'); };
var addRepo = function (dirPath, _a) {
    var url = _a.url;
    var CHILD_PROCESS_TIMEOUT = 60 * Math.pow(10, 3);
    return new Promise(function (resolve, reject) {
        var childProcess = child_process_1.default.spawn('git', ['clone', url, '-q'], { cwd: dirPath });
        setTimeout(function () {
            childProcess.kill();
            reject('Timeout exceeded');
        }, CHILD_PROCESS_TIMEOUT);
        childProcess.stderr.on('data', function (error) { return reject(error.toString()); });
        childProcess.on('close', function () { return resolve(); });
    });
};
var getCommitList = function (dirPath, _a) {
    var repositoryId = _a.repositoryId, commitHash = _a.commitHash;
    return new Promise(function (resolve, reject) {
        var childProcess = child_process_1.default.spawn('git', ['log', '--pretty=format:{"commit": "%H", "author": "%aN", "date": "%at", "message": "%f"},', commitHash], {
            cwd: path_1.join(dirPath, repositoryId),
        });
        var result = '';
        childProcess.stdout.on('data', function (data) { return result += data; });
        childProcess.stderr.on('data', function (error) { return reject(error.toString()); });
        // slice removes last comma
        childProcess.on('close', function () { return resolve("[" + result.slice(0, -1) + "]"); });
    });
};
var getCommitDiff = function (dirPath, _a) {
    var repositoryId = _a.repositoryId, commitHash = _a.commitHash;
    return new Promise((function (resolve, reject) {
        var childProcess = child_process_1.default.spawn('git', ['show', commitHash, '-m', '--format="%b"'], {
            cwd: path_1.join(dirPath, repositoryId),
        });
        var result = '';
        childProcess.stdout.on('data', function (data) { return result += data; });
        childProcess.stderr.on('data', function (error) { return reject(error.toString()); });
        childProcess.on('close', function () { return resolve(result); });
    }));
};
var getRepoContent = function (dirPath, _a) {
    var repositoryId = _a.repositoryId, commitHash = _a.commitHash, path = _a.path;
    return new Promise(function (resolve, reject) {
        var gitArgs = ['ls-tree', commitHash || 'master'];
        if (path) {
            gitArgs.push(path + "/");
        }
        var childProcess = child_process_1.default.spawn('git', gitArgs, {
            cwd: path_1.join(dirPath, repositoryId),
        });
        var result = [];
        childProcess.stdout.on('data', function (data) { return result.push.apply(result, utils_1.parseLsTreeLog(data.toString())); });
        childProcess.stderr.on('data', function (error) { return reject(error.toString()); });
        childProcess.on('close', function () { return resolve(result); });
    });
};
var getFileContent = function (dirPath, _a, onDataCb, onErrCb, onCloseCb) {
    var repositoryId = _a.repositoryId, commitHash = _a.commitHash, pathToFile = _a.pathToFile;
    var childProcess = child_process_1.default.spawn('git', ['show', commitHash + ":" + pathToFile], {
        cwd: path_1.join(dirPath, repositoryId),
    });
    childProcess.stdout.on('data', onDataCb);
    childProcess.stderr.on('data', onErrCb);
    childProcess.on('close', onCloseCb);
};
var deleteRepo = function (dirPath, _a) {
    var repositoryId = _a.repositoryId;
    return fs_extra_1.default.remove(path_1.join(dirPath, repositoryId));
};
exports.default = {
    getRepoList: getRepoList,
    addRepo: addRepo,
    getCommitList: getCommitList,
    getCommitDiff: getCommitDiff,
    getRepoContent: getRepoContent,
    getFileContent: getFileContent,
    deleteRepo: deleteRepo,
};
