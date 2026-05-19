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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.delete_request = delete_request;
exports.post_request = post_request;
exports.get_request = get_request;
exports.set_user_mood = set_user_mood;
exports.create_func_with_one_param = create_func_with_one_param;
exports.create_func_with_two_param = create_func_with_two_param;
exports.set_events_to_button_with_one_param = set_events_to_button_with_one_param;
exports.set_events_to_button = set_events_to_button;
exports.set_events_to_button_with_index_param = set_events_to_button_with_index_param;
var types_js_1 = require("./types.js");
function delete_request(route) {
    return __awaiter(this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    response = null;
                    return [4 /*yield*/, fetch(route, {
                            method: "DELETE", // HTTP method
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            credentials: 'include'
                        })];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, response];
            }
        });
    });
}
function post_request(route, body) {
    return __awaiter(this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    response = null;
                    return [4 /*yield*/, fetch(route, {
                            method: "POST", // HTTP method
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(body),
                            credentials: 'include'
                        })];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, response];
            }
        });
    });
}
function get_request(route) {
    return __awaiter(this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    response = null;
                    return [4 /*yield*/, fetch(route, {
                            method: "GET", // HTTP method
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            credentials: 'include'
                        })];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, response];
            }
        });
    });
}
var moodIcon = document.getElementById("moodIcon");
function set_user_mood(mood) {
    switch (mood) {
        case types_js_1.Mood.angry:
            moodIcon.src = "/assets/icons/moods/angry.png";
            break;
        case types_js_1.Mood.sad:
            moodIcon.src = "/assets/icons/moods/sad.png";
            break;
        case types_js_1.Mood.happy:
            moodIcon.src = "/assets/icons/moods/happy.png";
            break;
        case types_js_1.Mood.neutral:
            moodIcon.src = "/assets/icons/moods/neutral.png";
            break;
        default:
            break;
    }
}
function create_func_with_one_param(func, param) {
    function run_func_with_param() {
        return func(param);
    }
    return run_func_with_param;
}
function create_func_with_two_param(func, param, param2) {
    function run_func_with_param() {
        return func(param, param2);
    }
    return run_func_with_param;
}
function set_events_to_button_with_one_param(buttons, func, attr_name) {
    for (var i = 0; i < buttons.length; i++) {
        var button = buttons[i];
        var attr_value = button.getAttribute(attr_name);
        if (!attr_value) {
            console.log("error");
        }
        else {
            button.addEventListener("click", create_func_with_one_param(func, attr_value));
        }
    }
}
function set_events_to_button(buttons, func) {
    for (var i = 0; i < buttons.length; i++) {
        var button = buttons[i];
        button.addEventListener("click", func);
    }
}
function set_events_to_button_with_index_param(buttons, func) {
    var _loop_1 = function (i) {
        var button = buttons[i];
        button.addEventListener("click", function () {
            func(button, i);
        });
    };
    for (var i = 0; i < buttons.length; i++) {
        _loop_1(i);
    }
}
