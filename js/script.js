"use strict";

function getmystr(obj) {
    var x = obj.minput.value;
    var str = obj.sinput.value;
    var ss = obj.sinput.value;
    while (str.length < x) {
        str = str + ss;
    }
    if (str.length > x) {
        str = str.slice(0, x);
    }
    obj.res.value = str;
}

function lstr(ob) {
    var e = ob.minp.value;
    var d = e.length;
    ob.mout.value = d;
}

<!--Секундомер-->

//объявляем переменные
var base = 60;
var clocktimer, dateObj, dh, dm, ds, ms;
var readout = '';
var h = 1,
    m = 1,
    tm = 1,
    s = 0,
    ts = 0,
    ms = 0,
    show = true,
    init = 0,
    ii = 0;
//функция для очистки поля
function clearClock() {
    clearTimeout(clocktimer);
    h = 1;
    m = 1;
    tm = 1;
    s = 0;
    ts = 0;
    ms = 0;
    init = 0;
    show = true;
    readout = '00:00:00.00';
    document.Stopwatcher.stopwatch.value = readout;
    ii = 0;
}
//функция для старта секундомера
function startTIME() {
    var cdateObj = new Date();
    var t = (cdateObj.getTime() - dateObj.getTime()) - (s * 1000);
    if (t > 999) { s++; }
    if (s >= (m * base)) {
        ts = 0;
        m++;
    } else {
        ts = parseInt((ms / 100) + s);
        if (ts >= base) { ts = ts - ((m - 1) * base); }
    }
    if (m > (h * base)) {
        tm = 1;
        h++;
    } else {
        tm = parseInt((ms / 100) + m);
        if (tm >= base) { tm = tm - ((h - 1) * base); }
    }
    ms = Math.round(t / 10);
    if (ms > 99) { ms = 0; }
    if (ms == 0) { ms = '00'; }
    if (ms > 0 && ms <= 9) { ms = '0' + ms; }
    if (ts > 0) { ds = ts; if (ts < 10) { ds = '0' + ts; } } else { ds = '00'; }
    dm = tm - 1;
    if (dm > 0) { if (dm < 10) { dm = '0' + dm; } } else { dm = '00'; }
    dh = h - 1;
    if (dh > 0) { if (dh < 10) { dh = '0' + dh; } } else { dh = '00'; }
    readout = dh + ':' + dm + ':' + ds + '.' + ms;
    if (show == true) { document.Stopwatcher.stopwatch.value = readout; }
    clocktimer = setTimeout("startTIME()", 1);
}
//функция для паузы
function pause() {
    if (init == 0) {
        dateObj = new Date();
        startTIME();
        init = 1;
    } else {
        if (show == true) {
            show = false;
        } else { show = true; }
    }
}

//функция для вычисления значения в строке
function calcme(clc) {
    try {
        calc.input.value = eval(clc)
    } catch (e) {
        alert('Sample not calculated!');
    };
}

//Скрипт для нового секундомера
function trim(string) { return string.replace(/\s+/g, " ").replace(/(^\s*)|(\s*)$/g, ''); }
var init = 0;
var startDate;
var clocktimer;

function clearFields() {
    init = 0;
    clearTimeout(clocktimer);
    document.clockform.clock.value = '00:00:00.00';
    document.clockform.label.value = '';
}

function clearALL() {
    clearFields();
    document.getElementById('marker').innerHTML = '';
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
        var str = trim(document.clockform.label.value);
        document.getElementById('marker').innerHTML = (str == '' ? '' : str + ': ') +
            document.clockform.clock.value + '<br>' + document.getElementById('marker').innerHTML;
        clearFields();
    }
}