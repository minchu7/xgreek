"use strict";
/*global goPage, t2s, Lang, addBlankRow*/
function loadScript(url, callback){
    // Adding the script tag to the head as suggested before
    var head = document.head;
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
	script.async = false;
    script.onload = callback;

    // Fire the loading
    head.appendChild(script);
}
var strongCodeCur;
function moveStrongCode( dir){
	let i = parseInt( strongCodeCur);
	do{
		i += dir;
	}while( i >= 0 && i <= 5878 && typeof window.strongsGreekDictionary["G"+i] === "undefined");
	if( i <= 0 || i >= 5878){
		alert("Out off range!");
	}else{
		strongCodeCur = "" + i;
		initStrongDick( true);
	}
}
function goStrongCode(){
	let inputEl = document.getElementById('findStrongCode');
	let code = inputEl.value;
	if( typeof window.strongsGreekDictionary["G"+code] === "undefined"){
		inputEl.value = "error";
	}else{
		strongCodeCur = code;
		initStrongDick( true);
	}
}
function findInflections(){
	findAllWord( "Strong", strongCodeCur, true);
}
function makeInflections( foundArr){
	let proms = [];
	let book=-1; let chapter=0;
	for(let idx=0; idx < foundArr.length; idx++){
		let a = foundArr[idx];
		if( book!=a[0] || chapter!=a[1]){
			book = a[0];
			chapter = a[1];
			let url = 'verses/' + fileName( "", window.EbookAb[book], chapter+1);
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
			let langR = verseNode.getElementsByTagName("Greek");
            let txt, morph="";
            if( typeof langR[wseq-1] === "undefined"){
                txt = "Error:"+EbookAb[book]+":"+(chapter+1)+":"+(verse+1);
                console.log("READ:"+EbookAb[book]+":"+(chapter+1)+":"+(verse+1));
            }else{
                let wn = langR[wseq-1].getElementsByTagName("word");
                txt = wn[0].firstChild.textContent;
				langR = verseNode.getElementsByTagName("Morph");
				wn = langR[wseq-1].getElementsByTagName("word");
				morph = wn[0].firstChild.textContent;
            }
            a[3] = txt;
			a[4] = morph;
		}	
		console.log( getTimeStr());
		showInflections( foundArr);
	})
	.catch(function(error){
	  	console.log(error.message);
	});
}
function showInflections( foundArr){
	const list = document.createDocumentFragment();
	let keys = [];
	let i;
	for( i=0; i<foundArr.length; i++){
		let a = foundArr[i];
		let txt = polyG2monoG( a[3]).toLowerCase().replace(/[.,;·()\[\]]/g,"");
		if( typeof keys[txt] === "undefined"){
			keys[txt] = {count:1, morph:a[4]};
		}else{
			keys[txt].count++;
			if( keys[txt].morph.indexOf( a[4]) < 0)
				keys[txt].morph += ", " + a[4];
		}
	}
	let keysA = [], total=0;
	for( var key in keys){
		for( i=0; i < keysA.length; i++){
			if( keys[key].count > keysA[i].count)
				break;
			else if( keys[key].count === keysA[i].count){
				if( key < keysA[i].word)
					break;
			}
		}
		let wordO = {word:key, count:keys[key].count, morph:keys[key].morph};
		total += wordO.count;
		if( i < keysA.length)
			keysA.splice( i, 0, wordO);//insertAt
		else
			keysA.push( wordO);
	};
	for( i=0; i < keysA.length; i++){
		let wordO = keysA[i];
		createInflRow(list, wordO.word, wordO.count, wordO.morph);
	}
    let item= document.createElement('div');
    item.setAttribute('style', 'margin-top:5px;');
    item.innerHTML = "Occurred " + total + " times in " + keysA.length + " unique forms";
    list.insertBefore(item, list.childNodes[0]);
	let el = document.getElementById("InflectionsList");
	el.appendChild(list);
	setTimeout(hideModal, 500); // check again in falf second;
	document.getElementById("InflectionsListBnt").disabled = true;
}
function createInflRow( list, word, count, morph){
	let item= document.createElement('div');
	item.setAttribute('style', 'margin-top:5px;');
	item.innerHTML = count + " x " + "<b>"+addSpeakTag(word)+":</b>  " + morph;
	list.appendChild( item);
}
function addSpeakTag(word){
	return "<div onclick='speakStrongDicGr(event);' style='display: inline;'>" + word + "</div>";
}
function displayStrongCode(){
	//popTooltip(txt);
	if( window.displayLan !== 'E' && typeof window.chStrongDict === "undefined"){
		loadScript("ch-strong.js", displayStrongCode);
		return;
	}else{
		goPage("strongdict");
	}
}
function showStrongCode( code){
	strongCodeCur = code;
	if( typeof window.strongsGreekDictionary === "undefined"){
		loadScript("strongs-greek.js", displayStrongCode);
		return;
	}else{
		displayStrongCode();
		return;
	}
}
function goStrongWeb(){
	if(window.navigator.onLine){
		var url = 'http://www.blueletterbible.org/lang/lexicon/lexicon.cfm?Strongs=';
		if( window.displayLan == 'C')
			url = "http://bible.fhl.net/new/s.php?N=0&m=&k=";
		else if( window.displayLan == 'S')
			url = "http://bible.fhl.net/gbdoc/new/s.php?N=0&m=&k=";
		url += strongCodeCur;
        var win = window.open( url, "_blank");
        if( win === null)
            alert("Open link failed.");
	}
}
function makeGrLink( strO, patn){
	if( typeof strO === "undefined")
		return "";
	
	let i=0, str="", ib=0;
	while( i < strO.length){
		let idx = strO.indexOf( patn, i);
		if( idx === -1)
			break;
		idx += 2;
		let j = 0;
		for(; j < 4 && j < strO.length; j++){
			let c = strO.charAt(idx + j);
			if (c >= '0' && c <= '9') 
				continue;
			else
				break;
		} 
		if( j === 0){
			i = idx;
			continue;
		}
		str += strO.substring( ib, idx);
		ib = idx + j;
		let grCode = "G" + strO.substring( idx, ib);
		let lemma = window.strongsGreekDictionary[grCode].lemma;
		str += "<gr>" + grCode + "</gr>";
        if( typeof lemma !== "undefined"){
            str += addSpeakTag( lemma);
        }
		i = ib;
	}
	if( ib < strO.length)
		str += strO.substring( ib);
	return str;
}
function speakStrongDicGr( evt){
    speakGr( evt.currentTarget.textContent.trim());
}
function goConcordance(){
	let lang=window.selLangTags.indexOf( "Strong");
	goPageWithData('findtext', {lang, txt:strongCodeCur});
}
var historySDict;
function initStrongDick( add2back){
	if( typeof add2back === "undefined"){
		historySDict = [strongCodeCur];
	}else{
		if( add2back){
			historySDict.push( strongCodeCur);
		}
	}
	let goWebBtn = document.getElementById("openStrongPageBtn");
	if(window.navigator.onLine)
		goWebBtn.disabled=false;
	else
		goWebBtn.disabled=true;
	let codeKey = 'G'+strongCodeCur;
	let code = window.strongsGreekDictionary[codeKey];
	let strongdef = code.strongs_def;
	if(window.displayLan !== 'E'){//format chinese strongdef
		strongdef = window.chStrongDict[codeKey].strongs_def;
		strongdef = makeGrLink( strongdef, "見 ");
		if( window.displayLan === 'S')
			strongdef = t2s( strongdef);
		strongdef = addFormatChr( strongdef);
	}
	let dictInfo = document.getElementById( "StrongPageDict");
	let inflectionBtn = document.getElementById("InflectionsListBnt");
	let lemmaEl = document.getElementById("lemma");
	let findCodeEl = document.getElementById("findStrongCode");
	let strongDefEl = document.getElementById("strongs_def");
	findCodeEl.value = strongCodeCur;
	if( parseInt( strongCodeCur) > 5800){
		lemmaEl.innerHTML="";
		dictInfo.style.display = "none";
		inflectionBtn.disabled = true;
		if(window.displayLan === 'E')//format chinese strongdef
			strongdef = addFormatChr( strongdef);
		strongDefEl.innerHTML=strongdef;
	}else{
		lemmaEl.innerHTML=addSpeakTag( code.lemma);
		strongDefEl.innerHTML=strongdef;
		inflectionBtn.disabled = false;
		dictInfo.style.display = "";
		let elBackBtn = document.getElementById("BackSDictBtn");
		if( historySDict.length > 1)
			elBackBtn.style.display = "";
		else
			elBackBtn.style.display = "none";
		
		let kjvDef = code.kjv_def;
		kjvDef = makeGrLink( kjvDef, "+ ");
		document.getElementById("derivation").innerHTML=addGreekSound( code.derivation);
		document.getElementById("kjv_def").innerHTML= kjvDef;
	}
	addOnclick();
	document.getElementById("InflectionsList").innerHTML = "";
	let page = document.querySelector("#strongDictInfo");
	if( page.querySelector("#AddedBankEnd") === null)
		addBlankRow( "strongDictToolbar", goWebBtn, page, "div");
	setTimeout(function(){
    	page.parentElement.scrollTop = 0;
    }, 50);
}
function addGreekSound(txt){
	let outStr = "";
	let ptn = "</gr>(";
	let ib = 0;
	let i = txt.indexOf( ptn, ib);
	while( i >= 0){
		let iE = i + ptn.length;
		outStr += txt.substring( ib, iE);
		ib = iE;
		i = txt.indexOf(")", ib);
		outStr += addSpeakTag( txt.substring(ib, i)) + ")";
		ib = i + 1;
		i = txt.indexOf( ptn, ib);
	}
	outStr += txt.substring( ib);
	return outStr;
}
function addFormatChr( str){
	let arr = str.split("\n");
	str = "";
	for( let i=0; i < arr.length; i++){
		str += arr[i].replace(" ", "&nbsp;&nbsp;&nbsp;") + "<br>";
	}
	return str;
}
function strongClicked( evt){
	let el = evt.target;
	strongCodeCur = el.textContent;
	if( strongCodeCur.charAt(0) === "G")
		strongCodeCur = strongCodeCur.substring( 1);
	initStrongDick( true);
}
function addOnclick(){
	var gres = document.getElementsByTagName("gr");
	var i;
	for (i = 0; i < gres.length; i++) {
		gres[i].onclick = strongClicked;
	}
}
function backSDict(){
	historySDict.pop();
	strongCodeCur = historySDict[historySDict.length - 1];
	initStrongDick( false);
}
