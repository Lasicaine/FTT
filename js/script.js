"use strict";

function createString(createdStringForm) {
    var str = createdStringForm.symbols.value;
    var ss = createdStringForm.symbols.value;
    var x = createdStringForm.lengthStr.value;
    while (str.length < x) {
        str = str + ss;
    }
    if (str.length > x) {
        str = str.slice(0, x);
    }
    createdStringForm.result.value = str;
}

function lengthString(countLengthForm) {
    countLengthForm.resultLength.value = countLengthForm.originalString.value.length;
}

//Attention!!! Not secure function!
function calcme(clc) {
    try {
        calc.input.value = eval(clc)
    } catch (e) {
        calc.input.value = 'Sample not calculated!';
    };
}


function trim(string) { return string.replace(/\s+/g, " ").replace(/(^\s*)|(\s*)$/g, ''); }
var init = 0;
var startDate;
var clocktimer;

function clearFields() {
    init = 0;
    clearTimeout(clocktimer);
    document.clockform.clock.value = '00:00:00.00';
    document.clockform.labelStop.value = '';
}

function clearALL() {
    clearFields();
    document.getElementById('noteStop').innerHTML = '';
}

function startTIME() {
    var thisDate = new Date();
    var t = thisDate.getTime() - startDate.getTime();
    var ms = t % 1000;
    t -= ms;
    ms = Math.floor(ms / 10);
    t = Math.floor(t / 1000);
    var s = t % 60;
    t -= s;
    t = Math.floor(t / 60);
    var m = t % 60;
    t -= m;
    t = Math.floor(t / 60);
    var h = t % 60;
    if (h < 10) h = '0' + h;
    if (m < 10) m = '0' + m;
    if (s < 10) s = '0' + s;
    if (ms < 10) ms = '0' + ms;
    if (init == 1) document.clockform.clock.value = h + ':' + m + ':' + s + '.' + ms;
    clocktimer = setTimeout("startTIME()", 10);
}

function findTIME() {
    if (init == 0) {
        startDate = new Date();
        startTIME();
        init = 1;
    } else {
        var str = trim(document.clockform.labelStop.value);
        document.getElementById('noteStop').innerHTML = (str == '' ? '' : str + ': ') +
            document.clockform.clock.value + '<br>' + document.getElementById('noteStop').innerHTML;
        clearFields();
    }
}