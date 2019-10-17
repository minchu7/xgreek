var IsIos = true;
function vibrate(){
    try {
        webkit.messageHandlers.vibrateAction.postMessage( "do it");
    } catch(err) {
        console.log('The native context does not exist yet');
    }
}
function readFile( reff){
    try {
        webkit.messageHandlers.readFileAction.postMessage( reff);
    } catch(err) {
        console.log('The native context does not exist yet');
    }
}
function returnText( txt){
    
}
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
var ASpeechSynthesis = function() {
    this.pending = false;
    this.speaking = false;
    this.paused = false;
    this._voices = [{lang:"el-GR"}];
};
ASpeechSynthesis.prototype.speak = function(utterance) {
    try {
        let txt = replaceNoSoundWord( utterance.text);
        webkit.messageHandlers.speakAction.postMessage( txt);
    } catch(err) {
        console.log('The speak failed:'+err);
    }
}
ASpeechSynthesis.prototype.cancel = function() {
    try {
        webkit.messageHandlers.speakAction.postMessage( "");
    } catch(err) {
        console.log('The speak failed:'+err);
    }
};
ASpeechSynthesis.prototype.getVoices = function() {
    return this._voices;
};

function replaceWord( inStr, key, toW){
    let str = inStr;
    let newStr = "";
    let idx = str.indexOf(key);
    while ( idx >= 0){
        //when key found
        let endIdx = key.length + idx;
        if (((newStr.length==0 && idx == 0) || (idx > 0 && str.charAt(idx-1) == " ")) &&//before key are word break
            (endIdx == str.length || str[endIdx] == " ")) {//found a word
            newStr += str.substring(0, idx) + toW;
        }else{
            newStr += str.substring(0, endIdx);
        }
        str = str.substring(endIdx);
        idx = str.indexOf(key);
    }
    if( newStr.length == 0){
        return inStr;
    }else{
        return newStr + str;
    }
}

function replaceNoSoundWord( inStr){
    let string = inStr.toLowerCase();
    let keys = ["υιου","υιοι", "ου","ουχ","ει","αι","α","ουαι"];
    let toWs = ["γιου", "γιοι","χου","χουχ","γι","χαι","χα","χουαι"];
    let i = 0;
    while (i < keys.length) {
        string = replaceWord( string, keys[i], toWs[i]);
        i += 1;
    }
    return string;
}
