"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.previous_next_addEvent = previous_next_addEvent;
exports.start_pause_addEvent = start_pause_addEvent;
var funcs_1 = require("./funcs");
var previousbtn = document.getElementById("previous");
var start_pausebtn = document.getElementById("start_pause");
var nextbtn = document.getElementById("next");
function previous_next_addEvent(func) {
    var previous_event = (0, funcs_1.create_func_with_one_param)(func, false);
    var next_event = (0, funcs_1.create_func_with_one_param)(func, true);
    previousbtn.addEventListener('click', previous_event);
    nextbtn.addEventListener('click', next_event);
}
function start_pause_addEvent(func) {
    start_pausebtn.addEventListener("click", func);
}
