"use strict";
/*global goVerse, addHistory, loadVerse, isChinese, fileName, showVerseEl, makeOneVerse, addBlankRow, hideModal*/
var TextPageScrollTop;
function saveTextScrollTop(){
	TextPageScrollTop = document.getElementById("text-List").parentElement.scrollTop;
}
function initTextPage(){
	readOneChapterVerses( window.foundStVersTag, window.curBook, window.curChapter);
}
function clickTextPage( reff){
	saveTextScrollTop();
	window.showTextView = false;
	showReff( reff);
}
function showReff( vs){
	addHistory();
	setCurVerse(vs);
	loadVerse( window.curBook, window.curChapter);
}
function setCurVerse( str){
	var vs = str.split(':');
	window.curBook = vs[0];
	window.curChapter = vs[1];
	window.curVerse = vs[2];
}
function readOneChapterVerses( versionTag, bookAb, chapterNo){
	window.needSpace = !isChinese( versionTag);
	var url = 'verses/' + fileName( versionTag, bookAb, chapterNo);
	var fileObj = window.zip.file( url);
    if( fileObj !== null){
    	fileObj.async("string").then(function(value){
    		let txd = window.parseTxt.parseFromString(value, 'text/xml');
			let verseNs = txd.documentElement.getElementsByTagName("verse");
			drawTextPage( verseNs, bookAb, chapterNo);
			showVerseEl("textPage", true);
		});
    }else{
        alert("Missing chapter:" + url);
    }
}
var textRowArr;
function drawTextPage(txtNodes, bookAb, chapterNo){
	//need get element always, for the page jqm reload the page. 
	let verseUl = document.getElementById("text-List");
	if( verseUl !== null)
		verseUl.innerHTML = "" ;
	const fragment = document.createDocumentFragment();
	textRowArr = [];
	let liRow;
	for (var i = 0; i < txtNodes.length; ++i) {
		//following few lines we make each row is a verse.
		liRow = document.createElement("div");
		textRowArr[i] = liRow;
		fragment.appendChild(liRow);
		let vs = (i+1);
		liRow.innerHTML = "" + vs + ". ";
		makeOneVerse( liRow, txtNodes[i].getElementsByTagName("word"), window.needSpace, false, false);
		liRow.setAttribute("id", "Verse" + vs);
		liRow.setAttribute("class", "TextPage");
		liRow.setAttribute('onclick',"clickTextPage(\"" + bookAb + ":" + chapterNo + ":" + vs + "\");");
	}
	verseUl.appendChild(fragment);
	addBlankRow( "texttoolbar", liRow, verseUl, "div");

	hideModal();
	return true;
}
