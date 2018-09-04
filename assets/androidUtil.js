//flag android app
	function readXMLocal(book, chapter, versionTag){
    xmlFileCount++;
    readXMLFile(book, chapter, versionTag).then( function( xml){
        try {
            //console.log("read success."+fileName( versionTag, book, chapter));
            var xmlDoc = (new DOMParser()).parseFromString(xml, 'text/xml');
            mergeVersion( xmlDoc, versionTag, book, chapter);
            if(--xmlFileCount==0)
                showChapter();
        } catch (ex) {
            alert(ex);
        }
    }).catch(function (error) {
        console.log(error);
    });
}
function readXMLFile(book, chapter, versionTag){
    return new Promise( function(resolve, reject){
        var xml = window.injectedObject.readXML( fileName(versionTag, book, chapter));
        if( xml.length > 0)
            resolve( xml);
        else
            reject( "File not found:" + fileName( versionTag, book, chapter));
    });
}

//SpeechSynthesis
var SpeechSynthesisEvent = function() {
    this.charIndex;
    this.elapsedTime;
    this.name;
};
var speechSynthesisVoiceList = function(data) {
    ja = JSON.parse(data);
    return ja;
};
var SpeechSynthesisUtterance = function(text) {
    this.text = text;
    this.lang;
    this.voiceURI;
    this.volume;
    this.rate;
    this.pitch;

    this.onstart = null;
    this.onend = null;
    this.onerror = null;
    this.onpause = null;
    this.onresume = null;
    this.onmark = null;
    this.onboundary = null;
};
var SpeechSynthesisVoice = function() {
    this.voiceURI;
    this.name;
    this.lang;
    this.localService;
    this._default;
};
var exec
var ASpeechSynthesis = function() {
    this.pending = false;
    this.speaking = false;
    this.paused = false;
    this._voices = null;
    var data = window.injectedObject.exec( "startup", null);
    this._voices = speechSynthesisVoiceList(data);
};

ASpeechSynthesis.prototype.speak = function(utterance) {
	var successCallback = function(event) {
		if (event.type === "start" && typeof utterance.onstart === "function") {
			utterance.onstart(event);
		} else if (event.type === "end" && typeof utterance.onend === "function") {
			utterance.onend(event);
		} else if (event.type === "pause" && typeof utterance.onpause === "function") {
			utterance.onpause(event);
		} else if (event.type === "resume" && typeof utterance.onresume === "function") {
			utterance.onresume(event);
		} else if (event.type === "mark" && typeof utterance.onmark === "function") {
			utterance.onmark(event);
		} else if (event.type === "boundry" && typeof utterance.onboundry === "function") {
			utterance.onboundry(event);
		}
	};
	var errorCallback = function() {
		if (typeof utterance.onerror === "function") {
			utterance.onerror();
		}
	};
    window.injectedObject.exec( "speak", JSON.stringify([utterance]));
};

ASpeechSynthesis.prototype.cancel = function() {
    window.injectedObject.exec( "cancel", null);
};

ASpeechSynthesis.prototype.pause = function() {
    window.injectedObject.exec( "pause", null);
};

ASpeechSynthesis.prototype.resume = function() {
    window.injectedObject.exec( "resume", null);
};

ASpeechSynthesis.prototype.getVoices = function() {
	return this._voices;
};

