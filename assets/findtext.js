"use strict";
/*global clearList, isChinese, Lang, isGreek, setSelByVal, showModal, getSelVal, 
		 getBookName, addBlankRow, hideModal, getTimeStr, fileName, showReff */
var bookTxt = null;//3 dimensions array book, chapter, verse
var findTextBookVersion = null;//lang tag for bookTxt
var findTextBookVersionName = null;//lang tag for bookTxt
var parseTxt = new DOMParser();
var needSpace;
var diffElmScrollTop=-1;
var orgFoundArr =  null;
var versesPerView = 50;
var findKey = null;

function resetFindView(){
	findTextBookVersion = null;
	resetFoundList();
	setFoundCaption(0, "", "");
}
function checkFindPage( lang){
    if(lang!=="E" && window.isChinese( findTextBookVersion)){
    	if( diffElmScrollTop !== -1){
    		resetFindView();
		}
    }
}
var initFindTextData={};
function initFindText(){
	if( diffElmScrollTop !== -1){
		let top = diffElmScrollTop;
		if( !window.selLangTags.includes( findTextBookVersion)){
			top = 0;
			bookTxt = null;
			findTextBookVersion = null;			
			document.getElementById('searchText').value = "";
		}
		setTimeout(function(){
			document.getElementById("foundList").parentElement.scrollTop = top;
		}, 50);
	}
	new Lang(window.displayLan, window.translArr, "findtext");
	let VersionList = document.getElementById('versionCB');
  	clearList(VersionList);
  	for( let i=0; i < window.selLangNames.length; i++){
  		if( !isGreek(i) || window.selLangTags[i]==='Strong'){
		    let NewOption = new Option( window.selLangNames[i], window.selLangTags[i], false,false);
		    let n = VersionList.length;
		    VersionList.options[n] = NewOption;
			if( findTextBookVersion === null)
		    	findTextBookVersion = window.selLangTags[i];
		}
	}
	if( typeof initFindTextData.lang !== 'undefined'){
		let newLangTag = window.selLangTags[initFindTextData.lang];
		setSelByVal( 'versionCB', newLangTag);
		document.getElementById('searchText').value = initFindTextData.txt.replace(/[.,?\/#!$%\^&\*;:{}=`~()\[\]？！。…、﹑，﹐“”「」：；『』]/g,"");
		document.getElementById("foundList").parentElement.scrollTop = 0;
	}else{
		setSelByVal( 'versionCB', findTextBookVersion);
	}
}
function resetFoundList(){
	diffElmScrollTop = -1;
	let list = document.getElementById("foundList");
	list.parentElement.scrollTop = 0;
	while( list.childElementCount > 0)
		list.removeChild( list.lastChild);
	return list;
}
function getSelLabel( id) {
	let sel = document.getElementById(id);
	return sel.options[sel.selectedIndex].label;
}
function findTxtInBible(){
	let version = getSelVal('versionCB');
	let versionName = getSelLabel('versionCB');
	findTextBookVersionName = versionName;
	findKey = document.getElementById('searchText').value.trim();
	if( findKey.length === 0){
		alert( window.langV.get('NeedText'));
		return;
	}
	findAllWord( version, findKey);
}
function findAllWord( version, findKey, isInflections){
	showModal();
	if( version !== findTextBookVersion || bookTxt === null){
		setProgressVal( 40);
		readAllVerses( version, search);
	}else{
		search();
	}
	function makeStWSeq( idx, verse){
		let words = verse.split(' ');
		let pos = 0;
		//find the word seq
		let i;
		for( i=0; i < words.length; i++){
			if( pos === idx && words[i].length === findKey.length){
				return i+1;
			}
			pos += words[i].length + 1;
		}
		return null;
	}
	function makeVerse( idx, keyLen, verse){
		let txt = verse.substring( 0, idx);
		txt += "<span class='redtext'>";
		let i = idx+keyLen;
		txt += verse.substring( idx, i);
		txt += "</span>";
		txt += verse.substring( i);
		return txt;
	}
	function search(){
		setProgressVal( 70);
		let english = !isChinese( findTextBookVersion);
		if( english)
			findKey = findKey.toLowerCase();
		let foundArr = [];
		let i;
		for( i=0; i<bookTxt.length; i++){
			let book = bookTxt[i];
			let j;
			for( j=0; j < book.length; j++){
				let chapter = bookTxt[i][j];
				let k;
				for( k=0; k < chapter.length; k++){
					let verse = chapter[k].replace(/[.,·\[\]]/g,"");
					let idx;
					if(english)
						idx = verse.toLowerCase().indexOf( findKey);
					else
						idx = verse.indexOf( findKey);
					if( idx >= 0){
						let txt;
						if( findTextBookVersion === 'Strong')
							txt = makeStWSeq(idx, verse);
						else
							txt = makeVerse( idx, findKey.length, verse);
						if( txt !== null){
							let a = [i, j, k, txt];
							foundArr.push(a);
						}
					}
				}
			}
		}
		//console.log( getTimeStr());
		if( findTextBookVersion === 'Strong'){
			if( isInflections)
				makeInflections( foundArr);
			else
				makeStVerse(foundArr);
		}else{
			setFoundListArr( foundArr, findKey, findTextBookVersion);
		}
		return ;
	}
}
var foundStArr=null;
function makeStVerse( foundArr){
	//concated words together
	if( isChinese(window.foundStVersTag)){
		needSpace = false;
	}
	else{
		needSpace = true;
	}
	let proms = [];
	let book=-1; let chapter=0;
	for(let idx=0; idx < foundArr.length; idx++){
		let a = foundArr[idx];
		if( book!=a[0] || chapter!=a[1]){
			book = a[0];
			chapter = a[1];
			let url = 'verses/' + fileName( window.foundStVersTag, window.EbookAb[book], chapter+1);
			let fileObj = window.zip.file( url);
		    if( fileObj !== null){
		    	proms.push( fileObj.async("string").then(function(v){
				    return v;
				}));
		    }else{
		        alert("Missing chapter:" + url);
		    }
		}
	}
	Promise.all( proms)
	.then( function (values){
		let book = -1, chapter=0, idxV=0, verseNs = null; 
		foundStArr = [];
		for( let idx=0; idx < foundArr.length; idx++){
			let a = foundArr[idx];
			foundStArr[idx] = a.slice();
			if( book!=a[0] || chapter!=a[1]){
				book = a[0];
				chapter = a[1];
				let data = values[idxV++];
				let txd = parseTxt.parseFromString(data, 'text/xml');
				verseNs = txd.documentElement.getElementsByTagName("verse");
			}
			let verse = a[2];
			//console.log("READ:"+EbookAb[book]+":"+(chapter+1)+":"+(verse+1));
			let verseNode = verseNs[verse];
			let wseq = a[3];
			let langR = verseNode.getElementsByTagName(window.foundStVersTag);
			let wns = langR[0].getElementsByTagName("word");
			let txt = '';
			let w;
			for( w=0; w < wns.length; w++){
				let wn = wns[w];
				if( txt.length > 0 && needSpace){
					txt += ' ';
				}
				if( wn.firstChild === null){
					console.log("error:"+window.EbookAb[book]+":"+(chapter+1)+":"+(verse+1)+":w"+w);
				}else{
					let red = false;
					let seqa = wn.getElementsByTagName( 'GreekSeq');
					for( let i=0; i < seqa.length; i++){
						if( seqa[i].hasChildNodes() && seqa[i].firstChild.textContent == wseq){
							red = true;
							break;
						}
					}
					if( red) txt += "<span class='redtext'>";
					txt += wn.firstChild.textContent;
					if( red) txt += "</span>";
				}
			}
			a[3] = txt;
		}	
		console.log( getTimeStr());
		setFoundListArr( foundArr, findKey, findTextBookVersionName);
	})
	.catch(function(error){
	  	console.log(error.message);
	});
}
function saveListScrollTop(){
	diffElmScrollTop = document.getElementById("foundList").parentElement.scrollTop;
}
function clickDiff( reff){
	saveListScrollTop();
	showReff( reff);
}
function setFoundListArr( arr, findKey, versionName){
	setFoundCaption( arr.length, findKey, versionName);
    
	orgFoundArr = arr;
	setFoundList(0);
}
function createMyElement( className){
	let div = document.createElement('div');
	div.classList.add( className);
	return div;
}
function setFoundList( clickedIdx){
	let listEl = resetFoundList();
	const list = document.createDocumentFragment();
	
	let foundIdx = clickedIdx;
	let	foundArr = orgFoundArr;
	let clnRow = null, rowEl = null;
	if( versesPerView < foundArr.length){ //add more link
		let div = document.createElement("my-row");
		div.innerHTML =  window.langV.get( 'MoreRows');
		rowEl = createMyElement("my-list-table");
		rowEl.appendChild( div);
		let w = window.innerWidth;
		if( w > 600) w = 600;
		let colNum = Math.floor(w / 120);
		let row = null;
		let j=0;
		for( ; (j*versesPerView)<foundArr.length; j++){
			if( (j % colNum) === 0){
				if( row !== null)
					rowEl.appendChild(row);
				row = document.createElement("my-row");
				row.style.lineHeight = '1.6em';
			}
			let idx = j*versesPerView;
			let a = foundArr[idx];
			let ref = getBookName([a[0]])+":" + (a[1]+1) + '~';
			div = document.createElement("div");
			if( idx !== foundIdx){
				div.setAttribute('onclick', "setFoundList( " + idx + ");");
				ref = "<b>" + ref + "</b>";
			}
			div.innerHTML = ref;
			let col = document.createElement("my-col");
			col.appendChild( div);
			row.appendChild( col);
		}
		for( ; j % colNum !== 0; j++){
			row.appendChild( document.createElement("my-col"));
		}
		if( row !== null){
			rowEl.appendChild(row);
		}
		
		clnRow = rowEl.cloneNode(true);
		list.appendChild(rowEl);
	}
	let i = foundIdx;
	let item = null;
	for( ; i<foundArr.length && i < foundIdx+versesPerView; i++){
		let a = foundArr[i];
		let book = window.EbookAb[a[0]];
		let chapter = a[1]+1;
		let verse = a[2]+1;
		let reff = ""+chapter+":"+verse;
		item= document.createElement('div');
		item.setAttribute('style', 'margin-top:5px;');
       	item.setAttribute('onclick', "clickDiff( \"" + book + ":" + reff + "\");");
       	item.innerHTML = "<b>" + getBookName([a[0]]) + ":" + reff + "</b>  " + a[3];
		list.appendChild(item);
	}
	if( clnRow !== null){
		list.appendChild( clnRow);
		list.firstElementChild.scrollIntoView();
	}
	if( item !== null)
		addBlankRow( "findtoolbar", item, list, "div");
	listEl.appendChild(list);
	setTimeout(hideModal, 500); // check again in falf second;
}
function setFoundCaption(num, findKey, versionName){
	document.getElementById("FoundVerseKey").innerHTML = "'" + findKey + "'";
	document.getElementById("FoundVerseNo").innerHTML = "(" + num + ") in ";
	document.getElementById("FoundInVersion").innerHTML = versionName;
}
function getVersesInFile( data, versionTag){
	let txd = parseTxt.parseFromString(data, 'text/xml');
	let verseNs = txd.documentElement.getElementsByTagName("verse");
	let chpt = new Array( verseNs.length);
	let v;
	for( v=0; v < verseNs.length; v++){//for each verse
		let verseNode = verseNs[v];
		let langR = verseNode.getElementsByTagName(versionTag);
		let wns;
		wns = langR[0].getElementsByTagName("word");
		let txt = "";
		let w;
		for( w=0; w < wns.length; w++){
			let wn = wns[w];
			if( txt.length > 0 && needSpace){
				txt += ' ';
			}
			if( wn.firstChild === null){
				console.log("error:"+window.EbookAb[window.book]+":"+(window.chapter+1)+":"+(v+1)+":w"+w);
			}else
				txt += wn.firstChild.textContent;
		}
        chpt[v] = txt;
	}
	return chpt;
}
function readAllVerses( versionTag, search){
	findTextBookVersion = versionTag;
	console.log( getTimeStr());
	if( versionTag === "Strong"){
		loadScript("strongTxt.js", search);
		return;
	}
	bookTxt = new Array(27);
	needSpace = !isChinese( versionTag);
	let book = 0;
	let proms = [];
	for(; book < bookTxt.length; book++){
		let verseNumArr = window.BookMaxArray[book];
		let chapterNum = verseNumArr[0];
		bookTxt[book] = new Array( chapterNum);
		let chapter = 0;
		for(; chapter < chapterNum; chapter++){
			let url = 'verses/' + fileName( versionTag, window.EbookAb[book], chapter+1);
			let fileObj = window.zip.file( url);
		    if( fileObj !== null){
		    	proms.push( fileObj.async("string").then(function(v){
				    return v;
				}));
		    }else{
		        alert("Missing chapter:" + url);
		    }
		}	
	}
	Promise.all( proms)
	.then( function(values){
		let book = 0; 
		for( let idx=0; idx < values.length;){
			let a = bookTxt[book];
			for( let chapter=0; chapter<a.length; chapter++){
				bookTxt[book][chapter] = getVersesInFile( values[idx++], versionTag);
			}
			book++;
		}
		console.log( getTimeStr());
		search();
	})
	.catch(function(error) {
	  	console.log(error.message);
	});
}
