"use strict";
/*global initTextPage, Lang, setActionItemTxt, goPage, showVerseEl, hideModal, isChinese, 
		 setProgressVal, getVerseNum, morphCodeClicked, greekClicked, showStrongCode, 
		 popupList, evtParentByTag, paraNoteClicked, goPageWithData, greekVClicked, popTooltip*/
var verseNodes;
var verseXmlNodes;
var langV;
var showTextView=false;
var tabRowArr;
function isGreek( idx){
	return checkGreek( window.selLangTags[idx]);
}
function checkGreek( key){
	let idx = ['Greek', 'Lema', 'Morph', 'Strong', 'LMcode'].indexOf(key);
	return (idx >= 0);
}
function showChapter(){
	verseNodes = verseXmlNodes;
	if( showTextView){
		initTextPage();
	}else{
		langV = new Lang( window.displayLan, window.translArr, "home");
		showVerse();
		setActionItemTxt();
	}
}

function showVerse(){
	//need get element always, for the page jqm reload the page. if( verseTab == null)
	setProgressVal( 40);
	let verseTab = document.getElementById("verse");
	verseTab.innerHTML = "" ;
	const fragment = document.createDocumentFragment();
	
	//alert("$('home').find('h1'): " + $('div > h1').html());
	tabRowArr = [];
	let tabRow;
	for (var i = 0; i < verseNodes.length; ++i) {
		//following few lines we make each row is a table also.
		tabRow = document.createElement("tr");
		tabRowArr[i] = tabRow;
		fragment.appendChild(tabRow);

		var verseNode = verseNodes[i];
		if( window.fParallet)
			makeParaTableColumns( verseNode, tabRow, 0);
		else
			makeTableColumns( verseNode, tabRow, 0);
	}
	setProgressVal( 70);
	verseTab.appendChild(fragment);
	addBlankRow( "maintoolbar", tabRow, verseTab, "tr");
	showVerseEl("homePage", true);
	return true;
}
//draw interlinear table
//tableMap have []for each language, [][]for each column [][][]for each word
var tableMap;
function makeTableMap(verseNode){
	var columns = verseNode.getElementsByTagName('column');
	var grkUsed = [];
	for( var i=0; i < columns.length; i++)
	grkUsed[i] = false;
	var langRows = [];
	//words for each version mapping according to selected versions,
	//words in version by sequence: langRows[version][word]
	for( i=0; i < window.selLangTags.length; i++){
		if( isGreek(i)){
			langRows[i] = verseNode.getElementsByTagName(window.selLangTags[i]);
			var arr = [];
			for( let j=0; j < langRows[i].length; j++){
				arr[j] = langRows[i][j].getElementsByTagName("word")[0];
			}
			langRows[i] = arr;
		}else{
			var langR = verseNode.getElementsByTagName(window.selLangTags[i]);
			if( langR.length > 0)
			langRows[i] = langR[0].getElementsByTagName("word");
			else
			langRows[i] = null;
		}
	}
	tableMap = [];
	for( i=0; i < window.selLangTags.length; i++)
		tableMap[i] = [];
	var selWords = langRows[window.seqLangChoosed];
	var selectedGr = isGreek(window.seqLangChoosed);
	//loop through each word in the selected language
	for( i=0; i < selWords.length; i++){
		var w = selWords[i];
		//get linked Greek word(s) sequence#
		var gseqns = w.getElementsByTagName("GreekSeq");
		var gseqs = [];
		for( let j=0; j < gseqns.length; j++){
			gseqs[j] = gseqns[j].textContent;
			var seq = parseInt(gseqs[j])-1;
			if( seq >= 0 && seq < grkUsed.length)
			grkUsed[seq] = true;
		}
		//loop through selected versions
		for( let j=0; j < window.selLangTags.length; j++){
			tableMap[j][i] = [];
			let curRowGr = isGreek(j);
			let seqs = [];
			if( j == window.seqLangChoosed)
			tableMap[j][i][0] = langRows[j][i];
			else if( selectedGr){
				if( curRowGr)
				tableMap[j][i][0] = langRows[j][i];
				else{
					seqs[0] = (i+1).toString();
					tableMap[j][i] = findWordsBySeqs( curRowGr, langRows[j], seqs);
				}
			}else{
				tableMap[j][i] = findWordsBySeqs( curRowGr, langRows[j], gseqs);
			}
		}
	}
	if( selectedGr)
	return;
	//loop through unlinked Greek words.
	var idx = selWords.length;
	for( i = 0; i < grkUsed.length; i++){
		if( grkUsed[i])
		continue;
		//loop through selected versions
		for( let j=0; j < window.selLangTags.length; j++){
			tableMap[j][idx] = [];
			let curRowGr = isGreek(j);
			let seqs = [];
			if( j != window.seqLangChoosed){
				if( curRowGr)
				tableMap[j][idx][0] = langRows[j][i];
				else{
					seqs[0] = (i+1).toString();
					tableMap[j][idx] = findWordsBySeqs( curRowGr, langRows[j], seqs);
				}
			}
		}
		idx++;
	}
}
function findWordsBySeqs( isGr, langWords, seqs){
	var words = [];
	var iCount = 0;
	for( var i=0; langWords !== null && i < langWords.length; i++){
		var w = langWords[i];
		var gseqs = [];
		if( isGr){
			gseqs[0] = w.getAttribute("seq");
		}else{
			var gseqns = w.getElementsByTagName("GreekSeq");
			for( let j=0; j < gseqns.length; j++)
			gseqs[j] = gseqns[j].textContent;
		}
		for( let j=0; j < gseqs.length; j++){
			var gseq = gseqs[j];
			for( var k=0; k < seqs.length; k++){
				if( seqs[k]==gseq)
				words[iCount++] = w;
			}
		}
	}
	return words;
}
function changeSeqLang(evt){
	var ob = getVerseNum( evt);
	if( ob === null)
		return;
	var lang = ob.lang;
	var verse = ob.verse;
	var tabRow = tabRowArr[verse];
	tabRow.innerHTML="";
	makeTableColumns( verseNodes[verse], tabRow, lang);
}
function makeTableColumns( verseNode, tabRow, seqLang){
	//first column for verse number
	window.seqLangChoosed = seqLang;
	var num = verseNode.getAttribute('number');
	var verse = (parseInt(num)-1);
	tabRow.setAttribute("class","Verse");
	tabRow.setAttribute("id","Verse"+(verse+1));
	var tc;
	var numStr = "";
	numStr += (num<=9)?("0"+num):num;
	tc = document.createElement("td");
	tabRow.appendChild( tc);

	//table for each verse
	var table = document.createElement("table");
	table.setAttribute("bgcolor","#00aa00");
	table.setAttribute("width","auto");
	table.setAttribute("verse",verse);
	tc.appendChild( table);
	var tabRows = [];
	//create rows for each language
	for( let k = 0; k < window.selLangTags.length; k++){
		tabRows[k] = document.createElement("tr") ;
		table.appendChild( tabRows[k]);//new row for each column
	}
	makeTableMap( verseNode);
	//first column for each bible version selection
	//add language seq select button
	var bgcolor="white";
	let cell;
	for( let kk=0; kk < tableMap.length; kk++){
		cell = document.createElement("td");
		cell.setAttribute("bgcolor",bgcolor);
		var txt = "<div class='aSeqTag'>";
		if(kk == window.seqLangChoosed)
			txt += numStr + ":";
		if( window.selLangTags[kk] == "Greek"){
			txt += '&nbsp&nbsp<i class="icon icon-sync with-circle" style="padding: 0; font-size: 17px;"></i>';
			cell.setAttribute("style", 'background-color:#e0ffff');
			addTapHandler( cell, tapSelectRow);
		}
		else{
			cell.onclick = changeSeqLang;
			txt += window.selLangNames[kk];
		}
		txt += "</div>";
		cell.innerHTML = txt;
		tabRows[kk].appendChild( cell);
		tabRows[kk].setAttribute( "lang", kk);
	}
	//second column is the table for the whole verse
	for( let kk=0; kk < tableMap.length; kk++){
		//loop through each language
		//cell is last added td element
		var curLang = window.selLangTags[kk];
		for( let k = 0; k < tableMap[kk].length; k++){
			//loop through each column according the 'seq' tag of the word by the sequence of seqLangChoosed
			var words = tableMap[kk][k];
			var note = { str : "" };
			//prevent duplicate words
			var seqA = [];
			var found = false;
			let words1;
			if( k > 0){//take care many Greek words to one translation
				words1 = tableMap[kk][k-1];
				if( words.length === 0){//word do not map to any Greek
					if( words1.length === 0)
						found = true;
				}else{
					if( words1.length === 0){
						if( k > 1){//check mapped words seperated by unmapped word
							words1 = tableMap[kk][k-2];
							if( words1.length > 0){
								found = w1Inw2( words1, words);
								if( found){
									//var cellTmp = cell.previousElementSibling;
									tabRows[kk].removeChild( cell);
									cell = tabRows[kk].lastElementChild;
									//nextColspan() add 1 to the last span found in cell
									cell.setAttribute("colspan","" + (nextColspan(cell)));
								}
							}
						}
					}else{
						found = w1Inw2( words1, words);
					}
				}
			}
			if( found){
				if( words.length <= words1.length){
					cell.setAttribute("colspan",""+nextColspan(cell));
					continue;
				}else{
					tabRows[kk].removeChild( cell);
					var spanNum = nextColspan(cell);//save current span value
					cell = document.createElement("td");
					cell.setAttribute("colspan",""+spanNum);
				}
			}else
				cell = document.createElement("td");
			setCellTxt( cell, words, seqA, curLang, note);

			if( 'Strong' == curLang){
				cell.setAttribute("class","strongCode");
				addTapHandler( cell, tapStrongCode);
			}else if('Morph' == curLang){
				cell.setAttribute("class","morphCode");
				cell.onclick = morphCodeClicked;
			}else if('Greek' == curLang){
				cell.setAttribute("class","greekTD");
				cell.onclick = greekClicked;
			}else{//set the background color and click listener
				if( note.str.length > 0){
					cell.setAttribute( "note", note.str);
					addTapHandler( cell, tapNote);
					cell.setAttribute("class","noteWord");
				}else{
					var bcolor="white";
					if( tableMap[window.seqLangChoosed][k].length === 0)
						bcolor = 'rgb(210, 210, 200)';
					if( kk == window.seqLangChoosed){
						bcolor='yellow';
						addTapHandler(cell, tapSelectRow);
					}else{
						addTapHandler(cell, tapTextTd);
					}
					if( bcolor !== 'white')
						cell.setAttribute("style", 'background-color:'+bcolor);
				}
			}
			tabRows[kk].appendChild( cell);
		}//end of k
	}//end of kk
}
//tap handling functions
function tapSelectRow(evt){
	longtapStart( evt, 
		function(evt){
			let ob = getVerseNum( evt);
			if( ob === null)
				return;
			let lang = ob.lang;
			let verse = ob.verse;
			var tabRow = tabRowArr[verse];
			tabRow.innerHTML="";
			makeParaTableColumns( verseNodes[verse], tabRow, lang);
		},
		longtapFindText
	);
}
function tapTextTd(evt){
	longtapStart( evt, 
		changeSeqLang,
		longtapFindText
	);
}
function tapStrongCode( evt){
	evt.stopPropagation();
	window.LastTdPopup = evt.target;
	longtapStart( evt, 
		function(){
			popupList( evt, showStrongCode);
		},
		longtapFindText
	);
}
function tapNote( evt){
	evt.stopPropagation();
	window.LastTdPopup = evt.target;
	longtapStart( evt, 
		function(evt){
			let td = evtParentByTag(evt, "td");
			var txt = td.getAttribute('note');
			popTooltip(txt);
		},
		longtapFindText
	);
}
function longtapFindText(evt){
	let ob = getVerseNum( evt);
	if( ob === null)
		return;
	let lang = ob.lang;
	let el = evt.target;
	let tag = el.tagName.toUpperCase();
	if( tag == 'SUP')
		el = el.parentNode;
	else if( tag == 'TD'){
		el = el.firstChild;
		if( el === null)//blank td
			return;		
	}
	let txt = el.firstChild.textContent;
	goPageWithData('findtext', {lang, txt});
}
function setCellTxt( cell, words, seqA, curLang, note){
	for( var kkk=0; kkk < words.length; kkk++){
		var txt = "";
		//loop through words in the cell
		var seq = words[kkk].getAttribute('seq');
		//check duplicated word
		var kkkk=0;
		for( ; kkkk < seqA.length; kkkk++){
			if( seq == seqA[kkkk]) break;
		}
		if( kkkk == seqA.length){
			seqA[kkkk] = seq;
			if( kkk !== 0) {
				if( (parseInt(seq)-parseInt( seqA[kkk-1])!=1) && 'Strong' != curLang &&'Morph' != curLang)
					txt += '…';
				else
					txt += ' ';
			}
			if( words[kkk].firstChild !== null)
			txt += words[kkk].firstChild.textContent;
			txt += '<sup>'+seq+'</sup>';
			var ntxt = words[kkk].getAttribute('note');
			if( ntxt !== null){
				if( note.str.length > 0)
					note.str += "<br\>";
				note.str += ntxt;
			}
		}
		var element = document.createElement("div");
		if('Morph' == curLang){
			for( var idx = txt.indexOf(','); idx > 0;){
				idx++;
				element.innerHTML = txt.substring(0, idx);
				cell.appendChild( element);
				txt = txt.substring( idx);
				idx = txt.indexOf(',');
				element = document.createElement("div");
			}
		}
		element.innerHTML = txt;
		cell.appendChild( element);
	}//end of kkk
}

//parallet table
function makeParaTableColumns( verseNode, tabRow){
	//first column for verse number
	var num = verseNode.getAttribute('number');
	var verse = (parseInt(num)-1);
	tabRow.setAttribute("class","Verse");
	tabRow.setAttribute("id","Verse"+(verse+1));
	var tc;
	var numStr = "";
	numStr += (num<=9)?("0"+num):num;
	tc = document.createElement("td");
	tc.setAttribute("class","Verse");
	tabRow.appendChild( tc);
	//table for each verse
	var table = document.createElement("table");
	table.setAttribute("bgcolor","#00aa00");
	table.setAttribute("width","auto");
	table.setAttribute("verse",verse);
	tc.appendChild( table);
	var tabRows = [];
	//create rows for each language
	for( let k = 0; k < window.selLangTags.length; k++){
		tabRows[k] = document.createElement("tr") ;
		table.appendChild( tabRows[k]);//new row for each column
	}
	var paraTableMap = makeParaTableMap( verseNode);
	//first column for each bible version selection
	//add language seq select button
	var bgcolor="white";
	let cell;
	for( var kk=0; kk < paraTableMap.length; kk++){
		cell = document.createElement("td");
		cell.setAttribute("bgcolor",bgcolor);
		cell.style.textAlign = 'left';
		let txt = "";
		if( kk===0)
			txt = numStr + ":";
		else
			txt = "&nbsp&nbsp&nbsp&nbsp";
		if( window.selLangTags[kk] == "Greek"){
			txt += '&nbsp&nbsp<img width="20" height="20" src="images/volume-high.svg"></img>';
			cell.setAttribute("style", 'background-color:#e0ffff');
			cell.onclick = greekVClicked;
		}else{
			txt += window.selLangNames[kk];
		}
		cell.innerHTML = txt;
		let tabR = tabRows[kk];
		tabR.appendChild( cell);
		tabR.setAttribute( "lang", kk);
		tabR.onclick = changeSeqLang;
	}
	let addSpace = !isChinese(window.selLangTags[kk]);
	//second column is the table for the whole verse
	for( kk=0; kk < paraTableMap.length; kk++){
		//loop through each language
		cell = document.createElement("td");
		makeOneVerse( cell, paraTableMap[kk], addSpace, isGreek(kk), true);
		cell.setAttribute("bgcolor",bgcolor);
		tabRows[kk].appendChild( cell);
	}//end of kk
}
function makeParaTableMap(verseNode){
	var paraTableMap = [];
	//words for each version mapping according to selected versions,
	//words in version by sequence: paraTableMap[version][word]
	for( var i=0; i < window.selLangTags.length; i++){
		if( isGreek(i)){
			paraTableMap[i] = verseNode.getElementsByTagName(window.selLangTags[i]);
			var arr = [];
			for( var j=0; j < paraTableMap[i].length; j++){
				arr[j] = paraTableMap[i][j].getElementsByTagName("word")[0];
			}
			paraTableMap[i] = arr;
		}else{
			var langR = verseNode.getElementsByTagName(window.selLangTags[i]);
			if( langR.length > 0)
				paraTableMap[i] = langR[0].getElementsByTagName("word");
			else
				paraTableMap[i] = null;
		}
	}
	return paraTableMap;
}
function makeOneVerse( cell, words, addSpace, doGreek, showFrom){
	for( let k = 0; k < words.length; k++){
		var word = words[k];
		var note = "";
		let txt = "";
		if( word.firstChild !== null)
			txt += word.firstChild.textContent;
		var ntxt = word.getAttribute('note');
		if( ntxt !== null){
			if( note.length > 0)
				note += "<br\>";
			note += ntxt;
		}
		var element = document.createElement("div");
		if( addSpace)
			txt += ' ';
		element.innerHTML = txt;
		cell.appendChild( element);
		if( note !== null && note.length > 0){
			if( !showFrom){
				if( note.indexOf("來自")===0 || note.toLowerCase().indexOf("from")===0){
					element.remove();
					continue;//skip word from other verse
				}
			}
			element.setAttribute( "note", note);
			element.onclick = paraNoteClicked;
			element.setAttribute("class","noteWord");
			element.setAttribute("style", 'background-color:'+"lightgrey");
		}else if( !doGreek){
			var chel = word.firstElementChild;
			if( chel === null || chel.nodeName != "GreekSeq")
				element.setAttribute("style", 'background-color:'+"lightblue");
		}
	}//end of k
	cell.style.textAlign = 'left';
}

//display utils
function w1Inw2( words1, words2){//also words2 in words1 will return True
	if( words1.length > words2.length){
		var tmp = words2;
		words2 = words1;
		words1 = tmp;
	}
	var ii = 0;
	for( ; ii < words2.length-words1.length+1; ii++){
		if( words1[0] !== words2[ii])
			continue;
		var iii = 1;
		ii++;
		while( iii < words1.length && ii < words2.length){
			if( words1[iii] == words2[ii])
				iii++;
			ii++;
		}
		if( iii == words1.length){
			return true;
		}
	}
	return false;
}
function nextColspan( cell){
	var cs = cell.getAttribute("colspan");
	var csInt = 1;
	if( cs !== null)
		csInt = parseInt( cs);
	return csInt+1;
}
function addBlankRow( idToolBar, lastRow, versesEl, tabType){
	let h = window.innerHeight - lastRow.offsetHeight - document.getElementById( idToolBar).offsetHeight;
	if( h <= 0)
		return;
	let el = document.createElement( tabType);
	el.id = "AddedBankEnd";
	versesEl.appendChild(el);
	el.setAttribute("style","height:"+h+"px");
}
