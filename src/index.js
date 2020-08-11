"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var puppeteer_1 = require("puppeteer");
var fs_1 = require("fs");
;
var cc = console;
var pages = [
    {
        ID: 'monsters',
        url: 'https://www.dofus-touch.com/en/mmorpg/encyclopedia/monsters'
    },
    {
        ID: 'weapons',
        url: 'https://www.dofus-touch.com/en/mmorpg/encyclopedia/weapons'
    },
    {
        ID: 'equipment',
        url: 'https://www.dofus-touch.com/en/mmorpg/encyclopedia/equipment'
    },
    {
        ID: 'pets',
        url: 'https://www.dofus-touch.com/en/mmorpg/encyclopedia/pets'
    },
    {
        ID: 'mounts',
        url: 'https://www.dofus-touch.com/en/mmorpg/encyclopedia/mounts'
    },
    {
        ID: 'consumables',
        url: 'https://www.dofus-touch.com/en/mmorpg/encyclopedia/consumables'
    },
    {
        ID: 'resources',
        url: 'https://www.dofus-touch.com/en/mmorpg/encyclopedia/resources'
    },
    {
        ID: 'ceremonial-item',
        url: 'https://www.dofus-touch.com/en/mmorpg/encyclopedia/ceremonial-item'
    }
];
var rowsSelector = 'table tbody tr';
var nextPageSelector = '.ak-pagination ul li>a';
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var browser, page, _i, pages_1, _page, url, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, puppeteer_1.launch()];
            case 1:
                browser = _b.sent();
                return [4 /*yield*/, browser.newPage()];
            case 2:
                page = _b.sent();
                _i = 0, pages_1 = pages;
                _b.label = 3;
            case 3:
                if (!(_i < pages_1.length)) return [3 /*break*/, 9];
                _page = pages_1[_i];
                url = _page.url;
                _b.label = 4;
            case 4:
                if (!url) return [3 /*break*/, 8];
                return [4 /*yield*/, page.goto(url)];
            case 5:
                _b.sent();
                _a = storeItems;
                return [4 /*yield*/, fetchTableItems(page)];
            case 6:
                _a.apply(void 0, [_b.sent(), _page.ID]);
                return [4 /*yield*/, nextPageUrl(page)];
            case 7:
                url = _b.sent();
                return [3 /*break*/, 4];
            case 8:
                _i++;
                return [3 /*break*/, 3];
            case 9: return [4 /*yield*/, browser.close()];
            case 10:
                _b.sent();
                return [2 /*return*/];
        }
    });
}); })();
var fetchTableItems = function (page) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, page.evaluate(function (rowsSelector) {
                    return Array.from(document.querySelectorAll(rowsSelector))
                        .map(function (tableRow) { return ({
                        name: tableRow.cells[1].innerText,
                        itemUrl: tableRow.cells[1].querySelector('a').href,
                        imageUrl: tableRow.cells[0].querySelector('img').src
                    }); }).map(function (item) {
                        var itemUrlChunks = item.itemUrl.split('/');
                        var itemUrlLastChunk = itemUrlChunks[itemUrlChunks.length - 1];
                        var itemUrlLastChunkStringBeforeDash = itemUrlLastChunk.split('-')[0];
                        item.itemId = Number(itemUrlLastChunkStringBeforeDash).valueOf();
                        var imageUrlChunks = item.imageUrl.split('/');
                        var imageUrlLastChunk = imageUrlChunks[imageUrlChunks.length - 1];
                        var imageUrlLastChunkStringBeforeDash = imageUrlLastChunk.split('.')[0];
                        item.imageId = Number(imageUrlLastChunkStringBeforeDash).valueOf();
                        return item;
                    });
                }, rowsSelector)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
var nextPageUrl = function (page) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, page.evaluate(function (nextPageSelector) {
                    var links = Array.from(document.querySelectorAll(nextPageSelector));
                    return links[links.length - 2].href;
                }, nextPageSelector)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
var storeItems = function (items, partition) {
    var fileName = "data/" + partition + ".json";
    try {
        fs_1.writeFileSync(fileName, JSON.stringify(__spreadArrays(JSON.parse(fs_1.readFileSync(fileName, { encoding: 'utf-8' })), items.map(function (i) { return (__assign({ partition: partition }, i)); })).map(function (item, index) { return (__assign({ index: index }, item)); }), null, 2));
    }
    catch (e) {
        fs_1.writeFileSync(fileName, JSON.stringify(items.map(function (item, index) { return (__assign({ index: index, partition: partition }, item)); }), null, 2));
    }
};
