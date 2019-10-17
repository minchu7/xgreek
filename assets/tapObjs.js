"use strict";
var TapBase = function(evt, duration, timoutFunc, tapUpFunc, tapMoveFunc) {
	this.evt = evt;
	this.canTalk = true;
	this.timoutFunc = timoutFunc;
	this.tapUpFunc = tapUpFunc;
	this.tapMoveFunc = tapMoveFunc;
	
	this.shortF = true;//flag timeout done, taplong called
	this.pos = this.getPosition( evt);
	this.el = evt.target;
	this.longtapTimer = setTimeout(function () {
        //console.log("Timer event");
        this.shortF = false;
        if (window.getSelection) {
            if (window.getSelection().empty) {  // Chrome
                window.getSelection().empty();
            } else if (window.getSelection().removeAllRanges) {  // Firefox
                window.getSelection().removeAllRanges();
            }
        }
		this.timoutFunc( this.evt);
	}.bind(this), duration);
	//following two function are important for callback register, bind make this available in callback
	this.moveHandler = function( evtM) {
        return this.tapMoveFunc( evtM);
    }.bind(this);
	this.tapupHandler = function( evtM) {
        return this.tapUpFunc( evtM);
    }.bind(this);
    addTapUpHandler( this.el, this);
    //evt.preventDefault();
    evt.stopPropagation();
};
TapBase.prototype.getPosition = function( evtM){
	let evtB = evtM;
	if( typeof evtM.pageX === "undefined"){
		evtB = evtM.touches[0];
	}
	return {x:evtB.pageX, y:evtB.pageY};
};
TapBase.prototype.getDistance = function( pos1, pos2){
	return Math.abs(pos1.x - pos2.x) + Math.abs(pos1.y - pos2.y);
};
TapBase.prototype.clearHandler = function( evtM){
	clearTimeout( this.longtapTimer);
	removeTapUpHandler(this.el, this);
};

var LongtapObj = function(evt, tapshort, taplong) {
	this.tapshort = tapshort;
	this.abort = function( evtM){//for mousemove
		if(this.getDistance( this.pos, this.getPosition( evtM)) > 2){
			//console.log("move event moveHandler");
			this.clearHandler( evtM);
		}
	};
	this.tapup = function(evtM){
		//console.log("end event");
		evtM.preventDefault();
		evtM.stopPropagation();
		this.clearHandler( evtM);
		if( this.shortF)
			tapshort(evtM);
	};
	TapBase.call(this, evt, 800, taplong, this.tapup, this.abort);
}
LongtapObj.prototype = Object.create(TapBase.prototype);
LongtapObj.prototype.constructor = LongtapObj;

var longtapObj;
function longtapStart(evt, tapshort, taplong) {
	var ob = getVerseNum( evt);
	if( ob === null)
		return;
	if( 'Lema' == window.selLangTags[ob.lang]){
		tapshort( evt);
		return;
	}
	longtapObj = new LongtapObj( evt, tapshort, taplong);
}

var BlinkNode = function(evt) {
	let interval = 500, duration = 6000;	//following two function are important for callback register, bind make this available in callback
	this.intervalId = setInterval(
		(function(){
			this.el.style.visibility = (this.el.style.visibility === "hidden" ? "visible" : "hidden");
		}).bind(this), interval
	);
	this.stopBlink = function(){
		clearInterval( this.intervalId);
		this.el.style.visibility = "visible";
	}
	this.tapLong = function(){
		this.stopBlink();
		goPage("password");
	}
	TapBase.call(this, evt, duration, this.tapLong, this.stopBlink, this.stopBlink);
}
BlinkNode.prototype = Object.create(TapBase.prototype);
BlinkNode.prototype.constructor = BlinkNode;
var blinkNode;
function blinkAboutLogoBlink( evt){
	blinkNode = new BlinkNode( evt);
}

function checkPermitPw(){
	let promptTxt = "";
	var pw = document.getElementById("permitPassword").value;
	if( pw === "Lord Jesus" || pw === "lord jesus"){
		pwShowMsg( "Thank you for being a tester!");
		window.testerOn = true;
		setLangArrays();
		localStorage.setItem(window.testerOnFlag, "true");
	}else{
		let el = document.getElementById("passwordTxt");
		el.innerHTML = "Wrong password! Please try again:";
	}
}
function pwShowMsg( msg){
    let el = document.getElementById("passwordTxt");
    el.innerHTML = msg;
    document.getElementById("permitPassword").style.visibility = "hidden";
    document.getElementById("pwOkBtn").style.visibility = "hidden";
    document.getElementById("pwCancelBtn").innerHTML = "Back";
}
function addTapHandler( el, handler){
	if ('ontouchstart' in document.documentElement) {
		el.addEventListener("touchstart", handler, false);
	}else if( window.PointerEvent) {
		el.addEventListener("pointerdown", handler, false);
	}else
		el.addEventListener("mousedown", handler, false);
}
function addTapUpHandler( el, handlerObj){
	if ('ontouchend' in document.documentElement) {
		el.addEventListener("touchend", handlerObj.tapupHandler, false);
		el.addEventListener("touchmove", handlerObj.moveHandler, false);
	}else if( window.PointerEvent) {
		el.addEventListener("pointerup", handlerObj.tapupHandler, false);
		el.addEventListener("pointermove", handlerObj.moveHandler, false);
	}else{
		el.addEventListener("mouseup", handlerObj.tapupHandler, false);
		el.addEventListener("mousemove", handlerObj.moveHandler, false);
	}
}
function removeTapUpHandler( el, handlerObj){
	// Remove event listeners
	if ('ontouchend' in document.documentElement) {
		el.removeEventListener("touchend", handlerObj.tapupHandler, false);
		el.removeEventListener("touchmove", handlerObj.moveHandler, false);
	}else if (window.PointerEvent) {
		el.removeEventListener("pointerup", handlerObj.tapupHandler, false);
		el.removeEventListener("pointermove", handlerObj.moveHandler, false);
	}else{
		el.removeEventListener("mouseup", handlerObj.tapupHandler, false);
		el.removeEventListener("mousemove", handlerObj.moveHandler, false);
	}
}
