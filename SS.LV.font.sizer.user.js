// ==UserScript==
// @name         SS.LV font sizer
// @namespace    https://github.com/insajd/sslvFontSizer/
// @updateURL    https://github.com/insajd/sslvFontSizer/raw/master/SS.LV.font.sizer.user.js
// @downloadURL  https://github.com/insajd/sslvFontSizer/raw/master/SS.LV.font.sizer.user.js
// @version      0.1
// @description  Change font sizes on ss.lv page based on ad count in given categories
// @author       @insajd
// @match        http*://www.ss.lv/*
// @grant        none
// ==/UserScript==
/* jshint -W097 */
//'use strict';
fontSize = 6;
fontIncrement = 3;
groupCount = 5;
var disableFormatting = ["Vieglo auto maiņa", "Auto ar defektiem vai pēc avārijas", "Auto remonts un apkalpošana", "Autoevakuācija", "Autonoma", "Piekabes un treileri", "Rezerves daļas", "Riepas", "Transports invalīdiem"
                         , "Tūnings","Ekskluzīvas automašīnas","Sporta automašīnas","Tūningotas automašīnas","Retro automašīnas","Citas markas", "Rezerves daļas", "Auto noma", "Vieglo auto maiņa"];

categories = document.getElementsByClassName("category");
groupSize = Math.ceil(categories.length/groupCount);

var myList = [];
var i2 = 0;
for (var i = 0; i < categories.length; i++) {
    if (disableFormatting.indexOf(categories[i].getElementsByClassName("a_category")[0].textContent) > -1) {
        continue;
    }
    myList[i] = {};
    myList[i]["index"] = i;
    myList[i]["count"] = categories[i].getElementsByClassName("category_cnt")[0].textContent.replace('(','').replace(')','');
}
myList.sort(function(a,b) {
  return parseInt(a.count,10) - parseInt(b.count,10);
});

for (i = 0; i < myList.length; ++i) {
    if (i % groupSize == 0) {
        fontSize += fontIncrement;
    }
    
    indexToChange=myList[i]["index"];
    categories[myList[i].index].style.fontSize = String(fontSize)+"px";
}
