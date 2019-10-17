"use strict";
/*global backOnePage, addHistory, checkFileInit, loadVerse, checkFindPage, Lang, t2s*/
//keys for localStorage
var bookLanguage = "xgreek_bookLanguage";
var language = "xgreek_language";
var lastBook = "xgreek_Book";
var lastChapter = "xgreek_Chapter";
var ver4StrCodeFound = "xgreek_ver4StrCodeFound";
var testerOnFlag = "xgreek_tester";
var lastVerse = "Verse";
//following two var map from UI combobox string to tag value in lxm
//var langNames = ["None", "Greek", "Lemma", "Morph", "Strong", "恢復本", "和合本", 'KJV', "RcV", "LMcode", "新譯本","Indonesian New Trans. - beta", "ESV "];
//var langTags = ['junk', 'Greek', 'Lema', 'Morph', 'Strong', 'RCVChinese', 'UChinese', 'KJV', 'RCVEnglish', 'LMcode',"NCV","INZNTV","ESV"];
var testerLangTags = ['junk', 'Greek', 'Lema', 'Morph', 'Strong', 'KJV', 'RCVEnglish', "WEB", "ASV", 'RCVChinese', 'UChinese', "NCV", "LCV","CSB", "ESV","NIV"];
var ttesterLangNames = ["None", "Greek", "Lemma", "Morph", "Strong", 'KJV', "RcV", "WEB", "ASV", "恢復本", "和合本", "新譯本", "呂譯本","標準譯本", "ESV","NIV"];
var stesterLangNames = ["None", "Greek", "Lemma", "Morph", "Strong", "KJV", "RcV", "WEB", "ASV", "恢复本", "和合本", "新译本", "吕译本","标准译本", "ESV","NIV"];

var langNames;
var langTags = ["junk", "Greek", "Lema", "Morph", "Strong", "KJV", "RCVEnglish", "WEB", "ASV", "RCVChinese", "UChinese", "NCV", "LCV","CSB"];
var tLangNames = ["None", "Greek", "Lemma", "Morph", "Strong", "KJV", "RcV", "WEB", "ASV", "恢復本", "和合本", "新譯本", "呂譯本","標準譯本"];
var sLangNames = ["None", "Greek", "Lemma", "Morph", "Strong", "KJV", "RcV", "WEB", "ASV", "恢复本", "和合本", "新译本", "吕译本","标准译本"];
function isChinese( key){
	var idx = ['RCVChinese', 'UChinese', 'NCV', 'LCV', 'CSB'].indexOf(key);
	return (idx >= 0);
}

var selLangNames; //list of selected value from langNames
var selLangTags;  // corresponding tag value in selLangNames.
//settings view functions
var orgdisplayLan;
function initSetting(){
	window.displayLan = localStorage.getItem(window.bookLanguage);
	orgdisplayLan = window.displayLan;
	if( window.displayLan === null){//new user setting
        let sysLan = window.navigator.language;
		if( sysLan.indexOf('zh') === 0){
			if( sysLan.indexOf('-cn') > 0)
				window.displayLan = 'S';
			else
				window.displayLan = 'C';
		}
        else
            window.displayLan = 'E';
		localStorage.setItem(window.bookLanguage, window.displayLan);
        window.curBook = "Matt";
        window.curChapter = "1";
        window.curVerse = "1";
	}
	new Lang(window.displayLan, window.translArr, "setting");
	setLangRadio( window.displayLan);
	document.getElementById("ShowSettingBt").setAttribute("disabled","disabled");
	fillBooks(window.displayLan);

	if( window.curBook){
		setSelByVal( 'bookCB', window.curBook);
		fillChapters();
		setSelByVal( 'chapterCB', window.curChapter);
		fillVerses();
		setSelByVal( 'verseCB', window.curVerse);
	}
	loadSelVersions();
	//populateList(0);
}
function settingBackBtnClicked(){
	if( orgdisplayLan === null)//first time user start program disable back button
		return;
	if( orgdisplayLan !== window.displayLan){
		if( window.displayLan === 'S' || orgdisplayLan === 'S')
			goVerse( false);
	}
	backOnePage();
}
function goVerse(fromSetting){
	if( fromSetting){
		addHistory();
		window.curBook = getSelVal('bookCB');
		window.curChapter = getSelVal('chapterCB');
		window.curVerse = getSelVal('verseCB');
	}
	if( typeof curBook !== "undefined"){
		localStorage.setItem(lastBook, window.curBook);
		localStorage.setItem(lastChapter, window.curChapter );
		localStorage.setItem(lastVerse, window.curVerse );
		loadVerse( window.curBook, window.curChapter);
	}else{
		alert("goVerse type to set undefined curBook.");
	}
}
var selLangTagsTmp; // For setting page list of selected value from langTags
function showNewSetting(evt){
	if(document.getElementById("ShowSettingBt").getAttribute("disabled")==="disabled"){
		//return onclick do nothing
		evt.stopPropagation();
		return;
	}
	selLangTagsTmp = [];
	let el = document.getElementById( "showNewSetting").firstChild;
	do{
		let item = el.querySelector("#versionTag");
		selLangTagsTmp.push( item.getAttribute("value"));
		el = el.nextSibling;
	}while( el !== null);
	if( !compareArr(window.selLangTags, selLangTagsTmp))
		window.setTimeout(function (){
			window.selLangTags = selLangTagsTmp;
			window.selLangNames = newLanArray(window.selLangTags, window.langTags, window.langNames);
			localStorage.setItem(language, window.selLangTags.join(',')); //Save new setting
			goVerse( true);
		}, 0);//let rendering thread work
}
function compareArr( a, b){
	if( a.length == b.length){
		for( var i=0; i < a.length; i++){
			if( a[i] != b[i])
				return false;
		}
		return true;
	}
	return false;
}
function newLanArray( srcArr, mapArr, outArr){
	var a = [];
	for(var i=0; i<srcArr.length; ){
		var found = mapSel2Lang(srcArr[i], mapArr, outArr);
		if( found !== null){
			a[i++] = found;
		}else{//remove invalid item
			srcArr.splice(i, 1);
		}
	}
	return a;
}
function isSelIn( tok){
	for(var i=0; i < window.selLangTags.length; i++){
		if( window.selLangTags[i] == tok) return true;
	}
	return false;
}
function swapTo( evt, makeLangDiv, toId){
	selectLanChange();
	let el = evt.target;
	let row = el.parentElement;
	el = row.querySelector("#versionTag");
	el = makeLangDiv( el.getAttribute("value"), el.textContent);
	let block = document.getElementById( toId);
	if( toId === "notShowItems"){
		if( row.parentNode.childElementCount > 1){
			block.insertBefore(el, block.firstChild);
			row.parentNode.removeChild( row);
		}
	}else{
		block.appendChild( el);
		row.parentNode.removeChild( row);
	}
	disableTopBottom();
}
function toHidess( evt){
	swapTo( evt, makeChoosableDiv, "notShowItems");
}
function toSelects( evt){
	swapTo( evt, makeMovableDiv, "showNewSetting");
}
function moveDown( evt){
	let el = evt.target.parentElement.parentElement;
	let next = el.nextSibling;
	if( next !== null){
		el.classList.toggle('fade');
		setTimeout(function(){
			next.parentNode.insertBefore(el, next.nextSibling);
			el.classList.toggle('fade');
			disableTopBottom();
		}, 500);
		selectLanChange();
	}
}
function moveUp( evt){
	let el = evt.target.parentElement.parentElement;
	let pre = el.previousSibling;
	if( pre !== null){
		el.classList.toggle('fade');
		setTimeout(function(){
			pre.parentElement.insertBefore( el, pre);
			el.classList.toggle('fade');
			disableTopBottom();
		}, 700);
		selectLanChange();
	}
}
function makeMovableDiv( tag, name){
	let el = document.createElement("div");
	el.setAttribute("class", "rowVersion");
	let div = document.createElement("div");
	div.setAttribute("class", "btn pull-left icon icon-close");
	div.onclick = toHidess;
	el.appendChild( div);

	div = document.createElement("div");
	div.innerHTML = '<img width="25" height="25" src="images/icon-arrow-down.png">';
	div.setAttribute("class", "btn pull-right icon");
	div.onclick = moveDown;
	el.appendChild( div);

	div = document.createElement("div");
	div.innerHTML = '<img width="25" height="25" src="images/icon-arrow-up.png">';
	div.setAttribute("class", "btn pull-right icon");
	div.onclick = moveUp;
	el.appendChild( div);
	
	let title = makeLangTitle( tag, name);
	el.appendChild( title);
	return el;
}
function makeChoosableDiv( tag, name){
	let el = document.createElement("div");
	el.setAttribute("class", "rowVersion");
	let div = document.createElement("div");
	div.setAttribute("class", "btn pull-left icon icon-check");
	div.onclick = toSelects;
	el.appendChild( div);

	div = document.createElement("div");
	div.setAttribute("class", "btn pull-right icon");
	el.appendChild( div);

	div = document.createElement("div");
	div.setAttribute("class", "btn pull-right icon");
	el.appendChild( div);
	
	let title = makeLangTitle( tag, name);
	el.appendChild( title);
	return el;
}
function makeLangTitle( tag, name){
	let title = document.createElement("div");
	let div = document.createElement("div");
	div.setAttribute("class", "vrowcenter");
	div.setAttribute("value", tag);
	div.id = "versionTag";
	div.innerHTML = name;
	title.appendChild( div);
	return title;
}
function tag2name( tag){
	for( let i=1; i < window.langTags.length; i++){//for unused versions
		if( window.langTags[i] === tag)
			return window.langNames[i];
	}
	return null;
}
function loadSelVersions(){
	let selsEl = document.getElementById( "showNewSetting");
	selsEl.innerHTML = "";
	let hidesEl = document.getElementById( "notShowItems");
	hidesEl.innerHTML = "";
	let i;
	for( i = 0; i < window.selLangTags.length; i++){
		let tag = window.selLangTags[i];
		let el = makeMovableDiv( tag, tag2name( tag));
		selsEl.appendChild( el);
	}
	for( i=1; i < window.langTags.length; i++){//for unused versions
		if( isSelIn( window.langTags[i]))
			continue;
		let el = makeChoosableDiv( window.langTags[i], window.langNames[i]);
		hidesEl.appendChild( el);
	}
	disableTopBottom();
}
function disableTopBottom(){
	let selsEl = document.getElementById( "showNewSetting");
	selsEl.firstChild.firstChild.nextSibling.nextSibling.setAttribute("disabled","disabled");//top row
	selsEl.lastChild.firstChild.nextSibling.setAttribute("disabled","disabled");//bottom row
	if( selsEl.childElementCount >= 2){
		selsEl.firstChild.nextSibling.firstChild.nextSibling.nextSibling.removeAttribute("disabled");
		selsEl.lastChild.previousSibling.firstChild.nextSibling.removeAttribute("disabled");
	}
}
function selectLanChange(){
	let el = document.getElementById("ShowSettingBt");
	el.disabled = false;
	//loadSelVersions();
	//populateList(k);
}
function getSelVal( id) {
	let sel = document.getElementById(id);
	return sel.options[sel.selectedIndex].value;
}
function setSelByVal( id, val) {
	var element = document.getElementById(id);
    element.value = val;
}

//default language
function setLangRadio( lan){
	if (lan == 'C') {
        document.getElementById( "radio-opt-english" ).checked = false;
        document.getElementById( "radio-opt-simplified" ).checked = false;
        document.getElementById( "radio-opt-chinese" ).checked = true;
    }else if (lan == 'S') {
        document.getElementById( "radio-opt-english" ).checked = false;
        document.getElementById( "radio-opt-simplified" ).checked = true;
        document.getElementById( "radio-opt-chinese" ).checked = false;
    }else{
        document.getElementById( "radio-opt-english" ).checked =  true;
        document.getElementById( "radio-opt-simplified" ).checked = false;
        document.getElementById( "radio-opt-chinese" ).checked = false;
    }
}
function changeDisplayLang(){
	let x = document.getElementsByName("radio_language");
	let i;
	for (i = 0; i < x.length; i++) {
	    if(x[i].checked === true){
	    	let lang = x[i].value;
	    	changeBookLang( lang);
	    	checkFindPage( lang);
	    	return;
	    }
	}
}
function changeBookLang( lang){
	window.displayLan = lang;
	window.langV = new Lang(window.displayLan, window.translArr, "setting");
	localStorage.setItem(window.bookLanguage, lang);
	fillBooks(lang);
	setSelByVal( 'bookCB', window.curBook);
	fillChapters();
	setSelByVal( 'chapterCB', window.curChapter);
	fillVerses();
	setSelByVal( 'verseCB', window.curVerse);
	setLangArrays();
	window.selLangNames = newLanArray(window.selLangTags, window.langTags, window.langNames);
	loadSelVersions();
	//populateList(0);
}
function setLangArrays(){
	if( window.testerOn){
		window.langTags = window.testerLangTags;
		if( window.displayLan == 'S'){
			window.langNames = window.stesterLangNames;
		}else{
			window.langNames = window.ttesterLangNames;
		}
	}else{
		if( window.displayLan == 'S'){
			window.langNames = sLangNames;
		}else{
			window.langNames = tLangNames;
		}
	}
}
//verse selection
var BookMaxArray = new Array(27);
BookMaxArray[0] = [28,25,23,17,25,48,34,29,34,38,42,30,50,58,36,39,28,27,35,30,34,46,46,39,51,46,75,66,20];
BookMaxArray[1] = [16,45,28,35,41,43,56,37,38,50,52,33,44,37,72,47,20];
BookMaxArray[2] = [24,80,52,38,44,39,49,50,56,62,42,54,59,35,35,32,31,37,43,48,47,38,71,56,53];
BookMaxArray[3] = [21,51,25,36,54,47,71,53,59,41,42,57,50,38,31,27,33,26,40,42,31,25];
BookMaxArray[4] = [28,26,47,26,37,42,15,60,40,43,48,30,25,52,28,41,40,34,28,41,38,40,30,35,27,27,32,44,31];
BookMaxArray[5] = [16,32,29,31,25,21,23,25,39,33,21,36,21,14,23,33,27];
BookMaxArray[6] = [16,31,16,23,21,13,20,40,13,27,33,34,31,13,40,58,24];
BookMaxArray[7] = [13,24,17,18,18,21,18,16,24,15,18,33,21,14];
BookMaxArray[8] = [6,24,21,29,31,26,18];
BookMaxArray[9] = [6,23,22,21,32,33,24];
BookMaxArray[10] = [4,30,30,21,23];
BookMaxArray[11] = [4,29,23,25,18];
BookMaxArray[12] = [5,10,20,13,18,28];
BookMaxArray[13] = [3,12,17,18];
BookMaxArray[14] = [6,20,15,16,16,25,21];
BookMaxArray[15] = [4,18,26,17,22];
BookMaxArray[16] = [3,16,15,15];
BookMaxArray[17] = [1,25];
BookMaxArray[18] = [13,14,18,19,16,14,20,28,13,28,39,40,29,25];
BookMaxArray[19] = [5,27,26,18,17,20];
BookMaxArray[20] = [5,25,25,22,19,14];
BookMaxArray[21] = [3,21,22,18];
BookMaxArray[22] = [5,10,29,24,21,21];
BookMaxArray[23] = [1,13];
BookMaxArray[24] = [1,14];
BookMaxArray[25] = [1,25];
BookMaxArray[26] = [22,20,29,22,11,14,17,17,13,21,11,19,18,18,20,8,21,18,24,21,15,27,21];

var EbookNames = new Array(27), EbookAb = new Array(27), CbookNames= new Array(27);
CbookNames[0]  = "馬太福音"; EbookNames[0]  = "Matthew";			EbookAb[0]="Matt";        
CbookNames[1]  = "馬可福音"; EbookNames[1]  = "Mark";			EbookAb[1]="Mark";
CbookNames[2]  = "路加福音"; EbookNames[2]  = "Luke";			EbookAb[2]="Luke";
CbookNames[3]  = "約翰福音"; EbookNames[3]  = "John";			EbookAb[3]="John";
CbookNames[4]  = "使徒行傳"; EbookNames[4]  = "Acts";			EbookAb[4]="Acts";
CbookNames[5]  = "羅馬書"; EbookNames[5]  = "Romans";			EbookAb[5]="Rom";
CbookNames[6]  = "哥林多前書"; EbookNames[6]  = "1 Corinth";	    EbookAb[6]= "1Cor";
CbookNames[7]  = "哥林多後書"; EbookNames[7]  = "2 Corinth";	    EbookAb[7]= "2Cor";
CbookNames[8]  = "加拉太書"; EbookNames[8]  = "Galatians";		EbookAb[8]= "Gal";
CbookNames[9]  = "以弗所書"; EbookNames[9]  = "Ephesians";		EbookAb[9]= "Eph";
CbookNames[10] = "腓立比書"; EbookNames[10] = "Philippians";		EbookAb[10]="Phil";
CbookNames[11] = "歌羅西書"; EbookNames[11] = "Colossians";		EbookAb[11]="Col";
CbookNames[12] = "帖前"; EbookNames[12] = "1 Thessa";			EbookAb[12]="1The";
CbookNames[13] = "帖後"; EbookNames[13] = "2 Thessa";			EbookAb[13]="2The";
CbookNames[14] = "提摩太前書"; EbookNames[14] = "1 Timothy";		EbookAb[14]="1Tim";
CbookNames[15] = "提摩太後書"; EbookNames[15] = "2 Timothy";		EbookAb[15]="2Tim";
CbookNames[16] = "提多書"; EbookNames[16] = "Titus";				EbookAb[16]="Tit";
CbookNames[17] = "腓利門書"; EbookNames[17] = "Philemon";		EbookAb[17]="Phlm";
CbookNames[18] = "希伯來書"; EbookNames[18] = "Hebrews";			EbookAb[18]="Heb";
CbookNames[19] = "雅各書"; EbookNames[19] = "James";				EbookAb[19]="Jas";
CbookNames[20] = "彼得前書"; EbookNames[20] = "1 Peter";			EbookAb[20]="1Pet";
CbookNames[21] = "彼得後書"; EbookNames[21] = "2 Peter";			EbookAb[21]="2Pet";
CbookNames[22] = "約翰一書"; EbookNames[22] = "1 John";			EbookAb[22]="1John";
CbookNames[23] = "約翰二書"; EbookNames[23] = "2 John"; 			EbookAb[23]="2John";
CbookNames[24] = "約翰三書"; EbookNames[24] = "3 John";			EbookAb[24]="3John";
CbookNames[25] = "猶大書"; EbookNames[25] = "Jude";				EbookAb[25]="Jude";
CbookNames[26] = "啟示錄"; EbookNames[26] = "Revelation";		EbookAb[26]="Rev";
var CbookAb = new Array(27);
CbookAb[0]  = "馬太";
CbookAb[1]  = "馬可";
CbookAb[2]  = "路加";
CbookAb[3]  = "約翰";
CbookAb[4]  = "行傳";
CbookAb[5]  = "羅馬";
CbookAb[6]  = "林前";
CbookAb[7]  = "林後";
CbookAb[8]  = "加拉太";
CbookAb[9]  = "以弗所";
CbookAb[10] = "腓立比";
CbookAb[11] = "歌羅西";
CbookAb[12] = "帖前";
CbookAb[13] = "帖後";
CbookAb[14] = "提前";
CbookAb[15] = "提後";
CbookAb[16] = "提多";
CbookAb[17] = "腓利門";
CbookAb[18] = "希伯來";
CbookAb[19] = "雅各";
CbookAb[20] = "彼前";
CbookAb[21] = "彼後";
CbookAb[22] = "約一";
CbookAb[23] = "約二";
CbookAb[24] = "約三";
CbookAb[25] = "猶大";
CbookAb[26] = "啟示錄";

function getBookName( idx){
	if(idx < 0)
		return "";
	if( window.displayLan === 'E')
		return EbookAb[idx]; 
	else if( window.displayLan === 'C')
		return CbookAb[idx];
	else
		return t2s( CbookAb[idx]);
}
function bookIndex( book){
	for (let i=0; i<EbookAb.length; i++) {
		if( book === EbookAb[i]){
			return i;
		}
	}
	return -1;
}
function bookName( lang, bookAb){
	var idx = bookIndex( bookAb);
	if(idx < 0)
		return "";
	if( lang === 'E')
		return EbookNames[idx]; 
	else if( lang === 'C')
		return CbookNames[idx];
	else
		return t2s( CbookNames[idx]);
}
//set books chapters verses selectBox
function fillBooks( lang){
  var BookList = document.getElementById('bookCB');
  localStorage.setItem('bookLanguage', lang);
  clearList(BookList);

  for (let i=0; i<EbookAb.length; i++) {
    var NewOption = new Option( getBookName(i), EbookAb[i], false,false);
    BookList.options[i] = NewOption;
  }
  fillChapters();
}
function fillChapters(){
  var BookList = document.getElementById('bookCB');
  var ChapterList = document.getElementById('chapterCB');
  
  clearList(ChapterList);
  
  var NoChapters = BookMaxArray[BookList.selectedIndex][0];
  
  for (let i=1; i<=NoChapters; i++) {
    var NewOption = new Option(i,""+i,false,false);
    let n = ChapterList.length;
    ChapterList.options[n] = NewOption;
  }
  setSelByVal( 'chapterCB', "1");
  
  fillVerses();
}

function fillVerses(){
  var BookList = document.getElementById('bookCB');
  var ChapterList = document.getElementById('chapterCB');
  var VerseList = document.getElementById('verseCB');
  var NoVerses;
  
  clearList(VerseList);
  //console.log("fillVerses selected:"+BookList.selectedIndex);
  var s = BookMaxArray[BookList.selectedIndex];
  NoVerses = s[ChapterList.selectedIndex+1];//s[0] are the length
  
  for (var i=1; i<=NoVerses; i++) {
    var NewOption = new Option(i,""+i,false,false);
    var n = VerseList.length;
    VerseList.options[n] = NewOption;
  }
  
  setSelByVal( 'verseCB', "1");
}
//for util
function clearList(L){
  if( L===null)
    return;
  for (var i=L.length-1; i>=0; i--)
    L.remove(i);
}
function mapSel2Lang( sel, mapArr, outArr){
	for(var i=1; i<mapArr.length; i++){
		if( mapArr[i]==sel) return outArr[i];
	}
	return null;
}
function newLanArray( srcArr, mapArr, outArr){
	var a = [];
	for(var i=0; i<srcArr.length; ){
		var found = mapSel2Lang(srcArr[i], mapArr, outArr);
		if( found !== null){
			a[i++] = found;
		}else{//remove invalid item
			srcArr.splice(i, 1);
		}
	}
	return a;
}
