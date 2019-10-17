"use strict";
/*global Lang, backOnePage, currentPage, initTextPage, showModal, makeStVerse, checkGreek*/
function initSetFindText(){
	let txt = "";
  	for( var i=1; i < window.langNames.length; i++){
  		if( !checkGreek(window.langTags[i])){
		    let versionName = window.langNames[i];
		    let versionTag = window.langTags[i];
			let checked = "";
		    if( window.foundStVersTag==versionTag)
		    	checked = "checked";
			let itemF = 
			(`<input type="radio" style="line-height: 1.0em;" name='version' id='${versionTag}' ${checked}>	
				<label class='left' style="padding: 0 14px 0 0; margin:0; box-sizing: border-box;"></label>				
				<label for='${versionTag}' >${versionName}</label>
			</input><br/>`);
		    txt += itemF;
		}
	}
	document.getElementById('VersionRadioList').innerHTML = txt; 
	new Lang(window.displayLan, window.translArr, "setversion");
}
function setversionBack() {
	let select = document.querySelector('input[name="version"]:checked').id;
	backOnePage();
	if( select != window.foundStVersTag){
		window.foundStVersTag = select;
		localStorage.setItem(window.ver4StrCodeFound, window.foundStVersTag);
		if( currentPage()==="textpage"){
			initTextPage();
		}else{
			if(window.findTextBookVersion === "Strong"){
				if( window.foundStArr !== null){
					showModal();
					makeStVerse(window.foundStArr);
				}
			}
			
		}
	}
}
