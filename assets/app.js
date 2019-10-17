"use strict";
/*global JSZipUtils, JSZip, initStrongDick, bookIndex, initSetting, bookName, phonon, initialize, Lang, initFindText,
		 initSetFindText, saveListScrollTop, initTextPage, setCurVerse, hideModal, speakOff, goVerse*/
//start from internet, need parse url parameters
var QueryString = function () {
  // Parsing request string, is executed immediately and
  // the return value is assigned to QueryString!
  var query_string = {};
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
        // If first entry with this name
    if (typeof query_string[pair[0]] === "undefined") {
      query_string[pair[0]] = decodeURIComponent(pair[1]);
      // If second entry with this name
    } else if (typeof query_string[pair[0]] === "string") {
      var arr = [ query_string[pair[0]],decodeURIComponent(pair[1]) ];
      query_string[pair[0]] = arr;
        // If third or later entry with this name
    } else {
      query_string[pair[0]].push(decodeURIComponent(pair[1]));
    }
  }
  return query_string;
}();
//Phonon inits
var initOpts = {
    navigator: {
        defaultPage: 'home',
        animatePages: false,
        enableBrowserBackButton: false,
        useHash: false,//must be true
		templateRootDirectory: './pages'
    },
    i18n: null // for this example, we do not use internationalization
};
//following lines for environments
var displayLan='E';
var foundStVersTag=null;
var historyPages = ["home"];
var zip=null;
var testerOn=false;

checkSetting();
function checkFileInit(){
	if( zip !== null)
		return;
	if( window.location.hostname == "localhost"){
		//true for debug zip averses.zip, false for viewing new edit verse xml files
		if( window.debugZip === true){
			loadZip();
		}else{
			window.lastGreekIdx = 8;//working with old xml which has kjv, rcv, union
		}
	}else{//both android and ios
		loadZip();
	}
}
function loadZip() {
	JSZipUtils.getBinaryContent("averses.zip",
		function (err, data) {
			if(err) {
				alert("getBinaryContent error: " + err.message + (new Error().stack)); // or handle the error
			}else{
				let zipT = new JSZip();
				var promise = zipT.loadAsync(data);
				promise.then(
					function(){
						zip = zipT;
						console.log("zip load succeed!");
					}
				).catch( function (e) {
					    // Error: Corrupted zip : CRC32 mismatch
						alert("zip load error:" + e.message);
						return;
					}
				);
			}
		}
	);
}
checkFileInit();

phonon.options(initOpts);

var app = phonon.navigator();

/**
 * The activity scope is not mandatory.
 * For the home page, we do not need to perform actions during
 * page events such as onCreate, onReady, etc
*/
app.on({page: 'home', preventClose: false, content: null}, function(activity){
    activity.onCreate(function() {
    	let scrollDiv = document.querySelector('#homePage');
		scrollDiv.addEventListener('scroll', 
			function(){
				showVNumber();
			}
		);
		initialize();
    });
    activity.onReady(function() {
		//default language might changed
		setTitle( "verseTitle");
		showVerseEl('homePage', false);
		let elBackTextPageBtn = document.getElementById("BackTextBtn");
		if( historyPages.length > 1){
			elBackTextPageBtn.style.display = "";
		}else{
			elBackTextPageBtn.style.display = "none";
		}

    });
    activity.onHashChanged(function() {
    });
});

/**
 * However, on the second page, we want to define the activity scope.
 * [1] On the create callback, we add tap events on buttons. The OnCreate callback is called once.
 * [2] If the user does not tap on buttons, we cancel the page transition. preventClose => true
 * [3] The OnReady callback is called every time the user comes on this page,
 * here we did not implement it, but if you do, you can use readyDelay to add a small delay
 * between the OnCreate and the OnReady callbacks
*/
app.on({page: 'grammar', preventClose: true, content: 'grammar.html', readyDelay: 1}, function(activity) {
    activity.onCreate(function() {
    });
    activity.onClose(function(self) {
        self.close();
    });
    activity.onReady(function() {
    	new Lang(window.displayLan, window.translArrGram, "grammar");
    });
    activity.onHidden(function() {
    });
    activity.onHashChanged(function() {
    });
});
app.on({page: 'pronounce', preventClose: true, content: 'pronounce.html', readyDelay: 1}, function(activity) {
    activity.onCreate(function() {
    });
    activity.onClose(function(self) {
        self.close();
    });
    activity.onReady(function() {
    	new Lang(window.displayLan, window.translArrPronounce, "pronounce");
    });
    activity.onHidden(function() {
    });
    activity.onHashChanged(function() {
    });
});
app.on({page: 'setting', preventClose: true, content: 'setting.html', readyDelay: 1}, function(activity) {
    activity.onCreate(function() {
    });
    activity.onReady(function() {
    	initSetting();
    	hideModal();
    });
    activity.onClose(function(self) {
        self.close();
    });
    activity.onHidden(function() {
    });
    activity.onHashChanged(function() {
    });
});
app.on({page: 'textpage', preventClose: true, content: 'textpage.html', readyDelay: 1}, function(activity) {
    activity.onCreate(function() {
    	let scrollDiv = document.querySelector('#textPage');
		scrollDiv.addEventListener('scroll', 
			function(){
				showTxVNumber();
			}
		);
    	initTextPage();
    });
    activity.onClose(function(self) {
        self.close();
    });
    activity.onReady(function() {
    	showVerseEl('textPage', false);
    });
    activity.onHidden(function() {
    });
    activity.onHashChanged(function() {
    });
});
app.on({page: 'findtext', preventClose: true, content: 'findtext.html', readyDelay: 1}, function(activity) {
    activity.onCreate(function() {
    });
    activity.onClose(function(self) {
    	saveListScrollTop();
        self.close();
    });
    activity.onReady(function() {
    	initFindText();
    });
    activity.onHidden(function() {
    });
    activity.onHashChanged(function() {
    });
});
app.on({page: 'setversion', preventClose: true, content: 'setversion.html', readyDelay: 1}, function(activity) {
    activity.onCreate(function() {
    	initSetFindText();
    });
    activity.onClose(function(self) {
        self.close();
    });
    activity.onReady(function() {
    	new Lang(window.displayLan, window.translArr, "setversion");
    });
    activity.onHidden(function() {
    });
    activity.onHashChanged(function() {
    });
});
app.on({page: 'about', preventClose: true, content: 'about.html', readyDelay: 1}, function(activity) {
    activity.onCreate(function() {
    });
    activity.onClose(function(self) {
        self.close();
    });
    activity.onReady(function() {
    	new Lang(window.displayLan, window.translArr, "about");
		addTapHandler( document.getElementById("LogoImg"), blinkAboutLogoBlink);
    });
    activity.onHidden(function() {
    });
    activity.onHashChanged(function() {
    });
});
app.on({page: 'password', preventClose: true, content: 'about.html', readyDelay: 1}, function(activity) {
    activity.onCreate(function() {
    });
    activity.onClose(function(self) {
        self.close();
    });
    activity.onReady(function() {
		if(window.testerOn){
            pwShowMsg( "You are a tester already.");
		}
    });
    activity.onHidden(function() {
    });
    activity.onHashChanged(function() {
    });
});
app.on({page: 'strongdict', preventClose: true, content: 'strongdict.html', readyDelay: 1}, function(activity) {
    activity.onCreate(function() {
    });
    activity.onClose(function(self) {
        self.close();
    });
    activity.onReady(function() {
    	new Lang(window.displayLan, window.translArr, "strongdict");
		initStrongDick();
    });
    activity.onHidden(function() {
    });
    activity.onHashChanged(function() {
    });
});
setTimeout(function(){ 
	let SpashPage = document.getElementById("SpashPage");
	SpashPage.style.display = "none";
}, 1500);
//wait for zip object ready
function waitZipReady(){
	setTimeout(function(){
		if( zip === null)
			waitZipReady();
		else{
			/*
			if( currentPage() === "setting")
			//make first page work
			window.location.hash = "";
			else*/
			// Let's go!
			app.start();
		}
	}, 120);
}
waitZipReady();
document.on('pagecreated', function(event) {
    console.log('global state pagecreated: ' + event.detail.page);
});
document.on('pagetransitionend', function(event) {
    console.log('global state pagetransitionend: ' + event.detail.page + historyPages);
});

// init functions
function initStCodeDispVer(){
	let version = localStorage.getItem(window.ver4StrCodeFound);
	if(version){
		foundStVersTag = version;
	}else{
		if( window.displayLan === "E"){
			foundStVersTag = 'RCVEnglish';
		}
		else{
			foundStVersTag = 'RCVChinese';
		}
		localStorage.setItem(window.ver4StrCodeFound, foundStVersTag);
	}
}
function checkSetting(){
	window.displayLan = localStorage.getItem(window.bookLanguage);
	initStCodeDispVer();
	let lang = localStorage.getItem(window.language);
	window.testerOn = localStorage.getItem(window.testerOnFlag) === "true";
	setLangArrays();
	if( lang){
		initSelectedVersions( lang);
	}else
		initSelectedVersions( 'Greek,Lema,Strong,Morph,KJV,RCVEnglish,WEB,RCVChinese,UChinese,NCV');
	if(typeof QueryString.verse !== "undefined"){
        //For browser only
		setCurVerse( QueryString.verse);
	}else {
		window.curBook = localStorage.getItem(window.lastBook);
		window.curChapter = localStorage.getItem(window.lastChapter);
		window.curVerse = localStorage.getItem(window.lastVerse);
	}
	console.log("drawTable. curBook="+window.curBook+", curChapter="+window.curChapter);
	if( window.curBook === null || typeof window.curBook=="undefined" || window.curChapter === null){
		initOpts.navigator.defaultPage='setting';
		historyPages = ["setting"];
	}
}

//commom functions
function initSelectedVersions( lang){
	window.selLangTags = lang.split(',');
	window.selLangNames = newLanArray(window.selLangTags, window.langTags, window.langNames);
}
function setTitle(id){
	let titleEl = document.getElementById(id);
	if( titleEl !== null)
		titleEl.innerHTML = getBookName(bookIndex(window.curBook))+' '+window.curChapter+":"+window.curVerse;
}
function setSelByVal( id, val) {
	var element = document.getElementById(id);
    element.value = val;
}
function goNextChapter(){
	goChapter(1);
}
function goPrevChapter(){
	goChapter(-1);
}
function goChapter( direct){
	var chapter=parseInt( window.curChapter) + direct;
	if( chapter <= 0  || chapter >= bookChapterNum(window.curBook)){
		var ibook = bookIndex(window.curBook) + direct;
		if( ibook < 0 || ibook >= window.EbookAb.length)
			return;
		window.curBook = window.EbookAb[ibook];
		if( direct > 0)
			chapter = 1;
		else
			chapter = bookChapterNum( window.curBook) - 1;
	}
	window.curChapter = "" + chapter;
	window.curVerse = "1";
	goVerse(false);
}
function bookChapterNum(book){
	var i=bookIndex(book);
	if( i >= 0){
		return window.BookMaxArray[i].length;
	}else
		return -1;
}
//return false when pageName is on the top
//app.currentPage is not reliable
function currentPage(){
	return historyPages[historyPages.length-1];
}
function goPage( pageName){
	if( pageName==="home" || pageName === "textpage")
		setScrollTitleOk = false;

	if( currentPage()==="home" && pageName === "textpage"){//from home to textPage special case
		backOnePage();
	}else if( currentPage() !== pageName){
		app.changePage(pageName, '');
		historyPages.push( pageName);
		return true;
	}
	return false;
}
function goPageWithData( pageName, data){
	speakOff();
	if( pageName === "findtext"){
		window.initFindTextData = data;
	}
	goPage( pageName);
}
function backOnePage(){
	historyPages.pop();
	setScrollTitleOk = false;
	app.changePage( currentPage(), '');
}
function backPrevPage(){ //called by #BackTextBtn element
	backOnePage();
	if( currentPage() === "textpage")
		window.showTextView = true;
}
//scroll event handler
function showTxVNumber(){
	scrollVersNo("textPageTitle", window.textRowArr);
}
function showVNumber(){
	scrollVersNo("verseTitle", window.tabRowArr);
}
var setScrollTitleOk = true;
function scrollVersNo( idTitle, rowList){
	if( !setScrollTitleOk)
		return;
	var top = document.getElementById( idTitle).getBoundingClientRect().bottom + 10;
	for( var i=0; i<rowList.length; i++){
		var el = rowList[i];
		var rect = el.getBoundingClientRect();
	    var elemBottom = rect.bottom;

	    // Only completely visible elements return true:
	    if( elemBottom >= top){
	    	window.curVerse = i + 1;
	    	setTitle( idTitle);
			//console.log("scroll."+i);
			break;
		}
	}
}
function showVerseEl( id, scrollLeft){
	//setScrollTitleOk = false;
	setTimeout(function(){
		let el = document.getElementById( id);
		var elV = el.querySelector('#Verse'+window.curVerse);
		if( !elV){
			console.log("no element found. curVerse="+window.curVerse);
			return false;
		}
		console.log('showVerse='+elV.offsetTop);
		//check if need scroll left
		if( scrollLeft)
			elV.scrollIntoView( {inline: "start"});
		else
			elV.scrollIntoView();
		if( id === 'homePage')
			setTitle( "verseTitle");
		else
			setTitle( "textPageTitle");
		setScrollTitleOk = true;
		hideModal();
	},500);
}

//utils
function getTimeStr(){
	var currentdate = new Date();
	return "Last Sync: " + currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/"
                + currentdate.getFullYear() + " @ "
                + currentdate.getHours() + ":"
                + currentdate.getMinutes() + ":"
                + currentdate.getSeconds();
}
function scrollToId( idElm){
	let el = document.getElementById( idElm);
	if( el !== null)
		el.scrollIntoView();
}
var needInternet = "Need connect to internet!";
function goHelp(){
	if(window.navigator.onLine){
		var url = 'http://daybread.org/ntri/support/';
		if( window.displayLan == 'C')
			url = "http://daybread.org/ntri/zh/support-3/";
		else if( window.displayLan == 'S')
			url = "http://daybread.org/ntri/sc/support-2/";
        var win = window.open( url, "_blank");
        if( win === null)
            alert("Open link failed.");
	}else{
		alert(needInternet);
	}
}
function goTutorial(){
    if(window.navigator.onLine){
        var url = 'https://youtu.be/KxoyzR2Erq0';
        if( window.displayLan == 'C')
            url = "https://youtu.be/wl3HWstOWmY";
        else if( window.displayLan == 'S')
            url = "https://youtu.be/wl3HWstOWmY";
        var win = window.open( url, "_blank");
        if( win === null)
            alert("Open link failed.");
    }else{
        alert(needInternet);
    }
}
