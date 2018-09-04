var langV, popupMenu;
var util = {};

document.addEventListener('init', function(event){
	var view = event.target.id;
	if( view === 'main' ){
		util[view+'Init']( event.target);
	}
}, false);	
util.showVerseEl = function(){
	var elV = document.getElementById('Verse'+curVerse);
	if( !elV){
		console.log("no element found. curVerse="+curVerse);
		return false;
	}
	console.log('showVerse='+elV.offsetTop);
	elV.scrollIntoView();
}
util.mainInit = function( target){
	var scrollDiv = document.querySelector('#main .page__content');
	scrollDiv.addEventListener('scroll', function(){
		showVNumber();
	});
	//target.addEventListener('show', util.showVerseEl);
	setTimeout(util.showVerseEl, 600);
}
util.open = function() {
	var menu = document.getElementById('splitter-menu');
	menu.open();
}
util.menuClose = function() {
	var menu = document.getElementById('splitter-menu');
    menu.close();
}
util.load = function(page, data) {
	var myNavigator = document.getElementById('myNavigator');
	var menu = document.getElementById('splitter-menu');
	myNavigator.bringPageTop( page, {animation: 'none'}); 
	menu.close();
};
util.goPage = function(page, data) {
	var content = document.getElementById('myNavigator');
	var cp = content.topPage;
	if( page != cp)
		content.pushPage(page, data);
};
util.popPage = function() {
	var content = document.getElementById('myNavigator');
	content.popPage();
};
util.isTopMain = function() {
	var content = document.getElementById('myNavigator');
	var cp = content.topPage;
	return cp.id === 'main';
};