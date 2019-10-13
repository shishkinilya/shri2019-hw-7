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
var express_1 = __importDefault(require("express"));
var yargs_1 = require("yargs");
var path_1 = __importDefault(require("path"));
var mime_types_1 = __importDefault(require("mime-types"));
var cors_1 = __importDefault(require("cors"));
var git_service_1 = __importDefault(require("./git.service"));
var app = express_1.default();
var dirPath = yargs_1.argv.path;
console.log(yargs_1.argv);
app.use(express_1.default.json());
app.use(cors_1.default());
app.get('/api/repos', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var repoList, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, git_service_1.default.getRepoList(dirPath)];
            case 1:
                repoList = _a.sent();
                res.json({ data: repoList });
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                res.status(500);
                res.json({ error: error_1 });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.post('/api/repos', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, git_service_1.default.addRepo(dirPath, req.body)];
            case 1:
                _a.sent();
                res.json({ data: { status: 'ok' } });
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                res.status(500);
                res.json({
                    error: {
                        message: error_2,
                    },
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.get('/api/repos/:repositoryId/commits/:commitHash', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var commitList, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, git_service_1.default.getCommitList(dirPath, { repositoryId: req.params.repositoryId, commitHash: req.params.commitHash })];
            case 1:
                commitList = _a.sent();
                res.json({ data: JSON.parse(commitList) });
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                res.json({ error: error_3 });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.get('/api/repos/:repositoryId/commits/:commitHash/diff', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var commitDiff, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, git_service_1.default.getCommitDiff(dirPath, { repositoryId: req.params.repositoryId, commitHash: req.params.repositoryId })];
            case 1:
                commitDiff = _a.sent();
                res.json({ data: commitDiff });
                return [3 /*break*/, 3];
            case 2:
                error_4 = _a.sent();
                res.json({ error: error_4 });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.get('/api/repos/:repositoryId', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var repoContent, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, git_service_1.default.getRepoContent(dirPath, { repositoryId: req.params.repositoryId, commitHash: req.params.commitHash, path: req.params.path })];
            case 1:
                repoContent = _a.sent();
                res.json({ data: repoContent });
                return [3 /*break*/, 3];
            case 2:
                error_5 = _a.sent();
                res.json({ error: error_5 });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.get('/api/repos/:repositoryId/tree/:commitHash?/:path([^/]*)?', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var repoContent, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, git_service_1.default.getRepoContent(dirPath, { repositoryId: req.params.repositoryId, commitHash: req.params.commitHash, path: req.params.path })];
            case 1:
                repoContent = _a.sent();
                res.json({ data: repoContent });
                return [3 /*break*/, 3];
            case 2:
                error_6 = _a.sent();
                res.json({ error: error_6 });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.get('/api/repos/:repositoryId/blob/:commitHash/:pathToFile([^/]*)?', function (req, res) {
    var _a = req.params, repositoryId = _a.repositoryId, pathToFile = _a.pathToFile;
    var filePath = path_1.default.join(dirPath, repositoryId, pathToFile);
    var contentType = mime_types_1.default.contentType(path_1.default.extname(filePath));
    var dataCb = function (data) { return res.write(data); };
    var errCb = function (error) {
        res.status(500);
        res.json({ error: error.toString() });
    };
    var closeCb = function () { return res.send(); };
    res.type(contentType || 'application/octet-stream');
    git_service_1.default.getFileContent(dirPath, { repositoryId: req.params.repositoryId, commitHash: req.params.commitHash, pathToFile: req.params.path }, dataCb, errCb, closeCb);
});
app.delete('/api/repos/:repositoryId', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, git_service_1.default.deleteRepo(dirPath, { repositoryId: req.params.repositoryId })];
            case 1:
                _a.sent();
                res.json({ data: { status: 'ok' } });
                return [3 /*break*/, 3];
            case 2:
                error_7 = _a.sent();
                res.json({ error: error_7 });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.listen(3000);
