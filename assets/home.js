"use strict";
/*global currentPage, showChapter, JSZipUtils, JSZip, newLanArray, showReff, morphDictionary, vibrate, 
		 SpeechSynthesisUtterance, ASpeechSynthesis, showVerse, Lang, bookName, goPage*/
var debugZip = true;
var LastTdPopup;
var homePageInited = false;
//start up function
function initialize () {
	console.log("initialize.");
	homePageInited = true;
	loadVerse( window.curBook, window.curChapter);
}
//misc 
function getVerseNum( evt){
	let target = evtParentByTag( evt, "TR");
	if( target === null)
		return null;
		
	var ob = {lang:target.getAttribute("lang"), verse:target.parentNode.getAttribute("verse")};
	return ob;
}
function evtParentByTag( evt, tag){
	tag = tag.toUpperCase();
	var target = evt.target;
	while( target.tagName.toUpperCase() != tag){
		target = target.parentNode;
		if( target === null)
			return null;
	}
	return target;
}
var fParallet = false;
function flipParallet(){
	fParallet = ~fParallet;
	showVerse();
}
//history
var historyArr = [];
function removeHistoryItem( item){
	for( var i=0; i < historyArr.length; i++){
		if( historyArr[i] ===item){
			historyArr.splice( i, 1);
			break;
		}
	}
}
function addHistory(){
	var item = window.curBook+":"+window.curChapter+":"+window.curVerse;
	removeHistoryItem( item);
	historyArr.unshift( item);//add at beginning 
}
function makeHistoryList(){
	var i = 0, str = "<h3>"+ window.langV.get("History")+"</h3>";
	if( historyArr.length === 0)
		return str += "<li>"+ window.langV.get("None")+ "</li>";
	for(; i < historyArr.length && i < 20; i++){
		var verse = historyArr[i];
		var idx = verse.indexOf(":");
		var book = verse.substring(0, idx);
		var reff = verse.substring( idx+1);
		str += "<li onclick='return goHistory(\""+verse+"\");'>" + getBookName( bookIndex(book))+" "+reff + "</li>";
	}
	return str;
}
function loadVerse(book, chapter) {
	showModal();
	if( window.showTextView){
		goPage("textpage");
		//if the textpage created
		if( document.getElementById("text-List")===null)
			return;
	}else{
		goPage("home");
		//if homepage created
		if( document.getElementById("verse")===null)
			return;
	}
	if( homePageInited)
		addVersions( book, chapter);
}
function popupHistory(){
	LastTdPopup = null;
	popTooltip(makeHistoryList());
}
function goHistory( vs){
	console.log("goHistory="+vs);
	removeHistoryItem( vs);
	closeOverlay();
	showReff( vs);
}
//utility functions
function morphCodeClicked( evt){
    if(currentPage()!=="home")
        return;
    evt.stopPropagation();
	LastTdPopup = evt.target;
	popupList( evt, showMorphCode);
}
function paraNoteClicked( evt){
	evt.stopPropagation();
	LastTdPopup = evt.target;
	var txt = evt.target.getAttribute('note');
	popTooltip(txt);
}
function greekClicked( evt) {
	let ea = evt.currentTarget.childNodes;
    if( ea.length === 0)
		return;
	evt.stopPropagation();
	var txt = "";
    for( var i=0; i < ea.length; i++){
        if( i > 0)
            txt += " ";
        txt += ea[i].childNodes[0].textContent.trim();
    }
	speakGr( txt);
}
function showMorphCode( code, winopen){
	if( winopen)
		return;
	var idx = code.indexOf(',');
	if( idx > 0)
		code = code.substring(0, idx);
	var txt = morphDictionary(code);
	popTooltip(txt);
}
//tts Greek
function greekVClicked(evt){
	let ea = evt.currentTarget.nextSibling.childNodes;
    if( ea.length === 0)
		return;

	if( typeof vibrate !== "undefined")
        vibrate();
	evt.stopPropagation();
	var txt = "";
	for( var i=0; i < ea.length; i++){
		if( i > 0)
			txt += " ";
		txt += ea[i].childNodes[0].textContent.trim();
	}
	if( speakGr( txt))
		showVolumeOff();
}
var synth;
function speakOff(){
	if( typeof synth !== "undefined")
		synth.cancel();
	closeVolumeOff();
}
function speakGr( txt) {
	var outTxt = polyG2monoG( txt);
	if( outTxt.length === 0)
		return;
	var utterThis = new SpeechSynthesisUtterance(outTxt);
	if( typeof synth === "undefined"){
		if( typeof ASpeechSynthesis !== "undefined")
    	    synth = new ASpeechSynthesis();
    	else
    	    synth = window.speechSynthesis;
    }
    var voices = synth.getVoices();
	try{
		//out = "";
		if( voices.length === 0){
			// try again
			setTimeout(function(){}, 0);
			voices = synth.getVoices();
		}
		for(let i = 0; i < voices.length ; i++) {
			//out+=voices[i].lang+"\n";
			console.log(voices[i].lang);
			if(voices[i].lang=="el-GR" || voices[i].lang=="el_GR"){
				utterThis.rate = 0.5;
				//utterThis.voice = voices[i];
				utterThis.lang = voices[i].lang;
				synth.speak(utterThis);
				//alert("Speak done.");
				return true;
			}
		}
		if( typeof IsAndroid == 'undefined')
    		alert( "Your OS do not support Greek Text to speech!");
    	else
    		alert( "You need install 'Google Text-to-Speech' to support Greek Text to speech!");
	}catch( err){
		alert( "exception:"+err);
	}
	return false;
}
function pronounceClicked( evt) {
    let ea = evt.currentTarget.childNodes;
    if( ea.length === 0)
        return;
    evt.stopPropagation();
    var txt = "";
    for( var i=0; i < ea.length; i++){
        if( i > 0)
            txt += " ";
        txt += ea[i].textContent.trim();
    }
    speakGr( txt);
}
var toGr=
   "αααααααααααααααα"
 + "εεεεεε  εεεεεε  "
 + "ηηηηηηηηηηηηηηηη"
 + "ιιιιιιιιιιιιιιιι"
 + "οοοοοο  οοοοοο  "
 + "υυυυυυυυ υ υ υ υ"
 + "ωωωωωωωωωωωωωωωω"
 + "ααεεηηιιοουυωω  "
 + "αααααααααααααααα"
 + "ηηηηηηηηηηηηηηηη"
 + "ωωωωωωωωωωωωωωωω"
 + "ααααα ααααααα   "
 + "  ηηη ηηηηηηη   "
 + "ιιιι  ιιιιιι    "
 + "υυυυρρυυυυυυρ   "
 + "  ωωω ωωωωωωω   ";
var orgGr=
   "ἀἁἂἃἄἅἆἇἈἉἊἋἌἍἎἏ"
 + "ἐἑἒἓἔἕ  ἘἙἚἛἜἝ  "
 + "ἠἡἢἣἤἥἦἧἨἩἪἫἬἭἮἯ"
 + "ἰἱἲἳἴἵἶἷἸἹἺἻἼἽἾἿ"
 + "ὀὁὂὃὄὅ  ὈὉὊὋὌὍ  "
 + "ὐὑὒὓὔὕὖὗ Ὑ Ὓ Ὕ Ὗ"
 + "ὠὡὢὣὤὥὦὧὨὩὪὫὬὭὮὯ"
 + "ὰάὲέὴήὶίὸόὺύὼώ  "
 + "ᾀᾁᾂᾃᾄᾅᾆᾇᾈᾉᾊᾋᾌᾍᾎᾏ"
 + "ᾐᾑᾒᾓᾔᾕᾖᾗᾘᾙᾚᾛᾜᾝᾞᾟ"
 + "ᾠᾡᾢᾣᾤᾥᾦᾧᾨᾩᾪᾫᾬᾭᾮᾯ"
 + "ᾰᾱᾲᾳᾴ ᾶᾷᾸᾹᾺΆᾼ᾽ι᾿"
 + "῀῁ῂῃῄ ῆῇῈΈῊΉῌ῍῎῏"
 + "ῐῑῒΐ  ῖῗῘῙῚΊ ῝῞῟"
 + "ῠῡῢΰῤῥῦῧῨῩῪΎῬ῭΅`"
 + "  ῲῳῴ ῶῷῸΌῺΏῼ´῾ ";
function polyG2monoG( txt){
	var ret = "";
	for( var i=0; i < txt.length; i++){
		 var ch = txt.charAt(i);
		 if( txt.charCodeAt(i) >= 0x1F00){
		 	var idx = orgGr.indexOf( ch);
		 	if( idx > -1){
				ch = toGr.charAt(idx);
			}

		 }
		 ret += ch;
	}
	return ret;
}
function showVolumeOff(){
	var btn = document.getElementById("volume-off");
	let h = window.innerHeight;
	btn.style.top = ""+ (h-60) +"px";
	let w = window.innerWidth;
	btn.style.left = ""+ (w - 60) +"px";
	btn.style.visibility = "visible";
}
function closeVolumeOff(){
	var btn = document.getElementById("volume-off");
	btn.style.visibility = "hidden";
}

//actions popover
var previousPopover;
function openPopover(){
   	new Lang( window.displayLan, window.translArr, "overlayPopover");
	setActionItemTxt();
	document.getElementById("overlayPopover").style.width = "100%";
	var popover = document.querySelector("#action-popover");
    previousPopover = popover;
    window.setTimeout(function () {
    	popover.style.visibility = 'visible';
    }, 10); // Reset the scroll state
    popover.style.display = "block";
    popover.style.top = '44px';
    popover.style.left = "10px";
}
function hidePopover() {
	if( window.event.defaultPrevented)
		return;
    window.event.preventDefault();
	document.getElementById("overlayPopover").style.width = "0%";
    previousPopover.style.visibility = 'hidden';
    previousPopover.style.display = 'none';
    previousPopover = null;
}

//pupuptip
function openOverlay() {
    document.getElementById("overlay").style.width = "100%";
}
function closeOverlay() {
	if( window.event.defaultPrevented)
		return;
    window.event.preventDefault();
	document.getElementById("overlay").style.width = "0%";
	var popuptxt = document.getElementById("popoverTxt");
	popuptxt.classList.toggle("show");
}
function popTooltip( txt){
	openOverlay();
	var popuptxt = document.getElementById("popoverTxt");
	if( typeof txt === "string"){
		popuptxt.innerHTML = txt;
	}
	else{
		popuptxt.innerHTML = "";
		popuptxt.appendChild( txt);
	}
	var popup = document.getElementById("popup");
	popup.style.position = "absolute";
	if( LastTdPopup===null){
		let w = window.innerWidth;
		let h = window.innerHeight;
		let rcPop = popuptxt.getBoundingClientRect();
		//position of the bottom center
		popup.style.top = (h + rcPop.height)/2 +"px";
		popup.style.left = w/2 +"px";
	}else{
		let rc = LastTdPopup.getBoundingClientRect();
		let top = rc.top;
		let left = (rc.left+rc.right)/2;
		let rcPop = popuptxt.getBoundingClientRect();
		if( top - rcPop.height < 0)
			top = rcPop.height;
		let w = rcPop.width / 2;
		if( left - w < 0){
			left = w;
		}
		else if( left + w > window.innerWidth){
			left = window.innerWidth - w;
		}
		popup.style.top = ""+ top +"px";
		popup.style.left = ""+ left +"px";
	}
	popuptxt.classList.toggle("show");
}
var showTextFunc;
function addItem( ul, radioId){
	var poplistItem = document.createElement("li");
	poplistItem.appendChild( document.createTextNode( radioId));
	poplistItem.style.listStyleType="none";
	//css li has been defined poplistItem.style.minHeight = "20px";
	poplistItem.onclick = function(){
		closeOverlay();
		let chose = this.textContent.trim();
		if( chose !== "none")
			showTextFunc( chose);
	};
	ul.appendChild(poplistItem);
}
function loadList( ea){
	var ul = document.createElement('div');
	ul.classList.add("popuplist");
	addItem( ul, "none");
	for(var i=0; i < ea.length; i++){//loop through div
		var radioId = ea[i].childNodes[0].textContent;
		addItem( ul, radioId);
	}
	popTooltip( ul);
}
function popupList( evt, showText) {
	let td = evtParentByTag(evt, "td");
	if( td === null)
		return;
	let ea = td.childNodes;
    if( ea.length === 0)
		return;
	evt.stopPropagation();
	if( ea.length == 1){//only one item in the td element
		showText( ea[0].childNodes[0].textContent.trim());
		return;
	}
	showTextFunc = showText;
	loadList( ea);
	LastTdPopup.id = "CodeListPopup";
}
//display functions
var progressCur;
function showModal() {
  	var modal = document.querySelector('my-modal');
  	modal.style.display = 'block';
	progressCur = modal.getElementsByClassName("determinate")[0];
	setProgressVal( 10);
}
function setProgressVal( val){
	progressCur.style.width = "" + val + "%";
	console.log( "progress:"+val)
}
function hideModal() {
  	var modal = document.querySelector('my-modal');
   	modal.style.display = 'none';
}
function setActionItemTxt(){
	if( fParallet)
		document.getElementById("actionInterlinear").innerHTML = window.langV.get("Interlinear");
	else
		document.getElementById("actionInterlinear").innerHTML = window.langV.get("ParalletView");
}

//read xml file functions
var xmlFileCount;
function loadXMLDoc(book, chapter, versionTag){
    if( versionTag.length === 0){
        xmlFileCount = 0;
        window.verseXmlNodes = null;
    }
    if( typeof IsAndroid == 'undefined'){
    	//alert("start load zip file")
    	if( typeof zip == 'undefined')//only for localhost
        	loadXMLWeb( book, chapter, versionTag);
        else
        	loadXMLZip(book, chapter, versionTag);
	}else//only for android
       	loadXMLZip(book, chapter, versionTag);
        //readXMLocal( book, chapter, versionTag);
}
function fileName( langTag, book, chapter){
    var url = '';
    if( langTag.length > 0){
    	if( isChinese(langTag) && window.displayLan == "S"){
    		url += "s_";
		}
		url += langTag + '/';
	}
	return url + book+'_'+chapter  + '.xml';
}
// localhost debug only
function loadXMLWeb( book, chapter, versionTag){
	var url = '/Greek/verses/' + fileName( versionTag, book, chapter);
	xmlFileCount++;
	//var myMask = Ext.getCmp("setting").getMasked();
	//myMask.show();
	var xmlhttp=new XMLHttpRequest();
	xmlhttp.onreadystatechange=function(){
		if ( xmlhttp.readyState==4){
			xmlFileCount--;
			if( xmlhttp.status==200 || xmlhttp.status===0){
				var txd;
				if (window.displayLan==='S' || !xmlhttp.responseXML) {
					var txt = xmlhttp.responseText;
					txd = (new DOMParser()).parseFromString(txt, 'text/xml');
				}else{
					txd = xmlhttp.responseXML;
				}
				mergeVersion( txd, versionTag, book, chapter);
				if(xmlFileCount===0)
					showChapter();
			}else if( xmlhttp.status===0){
				alert( "xml format error:"+url);
			}else{
				alert('Loading ' + url + ' file failed.');
			}
		}//end readyStat==4
	};//end of onreadstatechange function
	try{
		xmlhttp.open("POST",url,true);
		if (xmlhttp.overrideMimeType){
			xmlhttp.overrideMimeType("text/xml") ;
		}
		xmlhttp.setRequestHeader ("Content-Type", "text/xml; charset='utf-8'") ;
		xmlhttp.send();
	}catch(err){
		let txt="There was an error on loading file:"+url;
		txt+="\nError description: " + err.message + "\n";
		txt+="Click OK to continue.\n";
		console.error(txt);
	}
}
//loading a zip file
function loadXMLZip( book, chapter, versionTag){
	if( window.zip === null)//during init some funny click can triger load
		return;
	var url = 'verses/' + fileName( versionTag, book, chapter);
	var fileObj = window.zip.file( url);
	if( fileObj !== null){
		xmlFileCount++;
		fileObj.async("string").then(function (data) {
			var txd = (new DOMParser()).parseFromString(data, 'text/xml');
			console.log( "zipfile="+versionTag+", "+book+", "+chapter);
			mergeVersion( txd, versionTag, book, chapter);
			if(--xmlFileCount===0)
				showChapter();
		});
	}else{
		alert("Missing file: "+url);
		missingVersion.push( versionTag);
	}
}

var lastGreekIdx = 4;
var oldlangTags = ["Greek", "Lema", "Morph", "Strong", "KJV", "RCVEnglish", "RCVChinese", "UChinese"];
function isOtherXmlFile( tag){
	var idx = oldlangTags.indexOf( tag);
	if( idx === -1){
		return true;
	}else{//for localhost
		return idx >= lastGreekIdx;
	}
}
//following three functions load xml dom from server or local
var missingVersion;
function addVersions(book, chapter){
	loadXMLDoc( book, chapter, "");
	for( var i = 0; i < window.selLangTags.length; i++){
		//load all the xml files except Greek
		var tag = window.selLangTags[i];
		if( isOtherXmlFile( tag)){//load version xml file
			loadXMLDoc(book, chapter, tag);
		}
	}
}
function mergeVersion( txd, versionTag, book, chapter){
    var vxn = txd.documentElement.getElementsByTagName("verse");
    if( window.verseXmlNodes === null){//add Greek node
        window.verseXmlNodes = vxn;
    }else{
        for (let i = 0; i < window.verseXmlNodes.length; ++i) {
            //following few lines we make each row is a table also.
            let verseNode = window.verseXmlNodes[i];
            let vn = vxn[i];
			if(versionTag.length > 0){
				let langR = vn.getElementsByTagName(versionTag)[0];
				vn.removeChild( langR);
				verseNode.appendChild( langR);
			}else{//for Greek columns in each verse
				let cols = vn.getElementsByTagName("column");
				while( cols.length > 0){
					let col = cols[0];
					vn.removeChild( col);
					verseNode.appendChild( col);
				}
			}
        }
    }
}
var xmlFileCount;
function loadXMLDoc(book, chapter, versionTag){
    if( versionTag.length === 0){
        xmlFileCount = 0;
        window.verseXmlNodes = null;
    }
    if( typeof IsAndroid == 'undefined'){
    	//alert("start load zip file")
    	if( typeof zip == 'undefined')//only for localhost
        	loadXMLWeb( book, chapter, versionTag);
        else
        	loadXMLZip(book, chapter, versionTag);
	}else//only for android
       	loadXMLZip(book, chapter, versionTag);
        //readXMLocal( book, chapter, versionTag);
}
