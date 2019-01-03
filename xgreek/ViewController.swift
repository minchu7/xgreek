//
//  ViewController.swift
//  xgreek
//
//  Created by user144284 on 8/20/18.
//  Copyright © 2018 user144284. All rights reserved.
//

import UIKit
import WebKit
import AudioToolbox
import AVFoundation

class ViewController: UIViewController, WKUIDelegate, WKScriptMessageHandler{
    
    var webView: WKWebView!
    var synthesizer: AVSpeechSynthesizer!

    override func viewDidLoad() {
        super.viewDidLoad()
        self.synthesizer = AVSpeechSynthesizer()
        //self.synthesizer.delegate = self
        
        //javascript interface
        let contentController = WKUserContentController()
        contentController.add( self, name: "vibrateAction")
        contentController.add( self, name: "speakAction")

        let config = WKWebViewConfiguration()
        config.userContentController = contentController
        let rec = self.view.bounds
        var top:Int = 0;
        let systemVersion = UIDevice.current.systemVersion
        if systemVersion.hasPrefix("10.") {top = 20}
        let fram = CGRect( x:0, y:top, width:Int(rec.width), height:(Int(rec.height)-top))
        webView = WKWebView(frame: fram, configuration: config)
        webView.uiDelegate = self
        webView.configuration.preferences.setValue(true, forKey: "allowFileAccessFromFileURLs")
        webView.autoresizingMask = [.flexibleWidth, .flexibleHeight]
        
        let path = Bundle.main.path(forResource:"assets/index", ofType: "html")
	    let fileURL = URL(fileURLWithPath: path!)
        webView.load(URLRequest(url: fileURL))
        view.addSubview( webView)
        let refresh = UIBarButtonItem(barButtonSystemItem: .refresh, target: webView, action: #selector(webView.reload))
        toolbarItems = [refresh]
        navigationController?.isToolbarHidden = false
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
        if message.name == "vibrateAction" {
            AudioServicesPlayAlertSound(kSystemSoundID_Vibrate);
        }else if message.name == "speakAction" {
            if #available(iOS 10.0, *) {
                do {
                    try AVAudioSession.sharedInstance().setCategory(.playback, mode: .default)
                    try AVAudioSession.sharedInstance().setActive(true)
                } catch {
                    print(error)
                }
            }
            var messageBody = message.body as? String ?? ""
            messageBody = replaceNoSoundWord( messageBody)
            let utterance = AVSpeechUtterance(string: messageBody)
            let v = AVSpeechSynthesisVoice(language: "el-GR")
            //let utterance = AVSpeechUtterance(string: "this English test")
            //let v = AVSpeechSynthesisVoice(language: "en-US")
            //print( v.debugDescription);
            utterance.voice = v
            utterance.rate = 0.25
            utterance.volume = 1
            if synthesizer.isSpeaking {
                synthesizer.stopSpeaking(at: .immediate)
            }
            DispatchQueue.main.async {
                self.synthesizer.speak(utterance)
            }
        }
    }
    func replaceNoSoundWord(_ inStr:String)->String{
        let key = "υιου", toW = "γιου"
        var string = inStr
        while let idx = string.index(of:key){
            var newStr = ""
            if idx.encodedOffset > 0 {
                if string[idx.encodedOffset-1] != " " {
                    return inStr
                }
                newStr = "\(string[..<idx])" + toW
            }else{
                newStr = toW
            }
            let endIdx = key.count + idx.encodedOffset
            if  endIdx != string.count{
                if string[endIdx] != " "{
                    return  inStr
                }
                newStr += "\(string[endIdx ..< string.count])"
            }
            string = newStr
        }
        return string
    }
    func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
        title = webView.title
    }
    
    func webView(_ webView: WKWebView,
                 createWebViewWith configuration: WKWebViewConfiguration,
                 for navigationAction: WKNavigationAction,
                 windowFeatures: WKWindowFeatures) -> WKWebView? {
        if navigationAction.targetFrame == nil {
            //webView.load(navigationAction.request)
            UIApplication.shared.open(navigationAction.request.url!, options: [:])
        }
        return nil
    }
}
extension ViewController: AVSpeechSynthesizerDelegate{
    private func attributedString(from string: String, highlighting characterRange: NSRange) -> String {
        return string + characterRange.debugDescription
    }
    
    func speechSynthesizer(_ synthesizer: AVSpeechSynthesizer, willSpeakRangeOfSpeechString characterRange: NSRange, utterance: AVSpeechUtterance) {
        print( attributedString(from: utterance.speechString, highlighting: characterRange))
    }
    
    func speechSynthesizer(_ synthesizer: AVSpeechSynthesizer, didStart utterance: AVSpeechUtterance) {
        print( "start:" + utterance.speechString)
    }
    
    func speechSynthesizer(_ synthesizer: AVSpeechSynthesizer, didFinish utterance: AVSpeechUtterance) {
        print( "finish:" + utterance.speechString)
    }
}
extension StringProtocol where Index == String.Index {
    func index(of string: Self, options: String.CompareOptions = []) -> Index? {
        return range(of: string, options: options)?.lowerBound
    }
    func endIndex(of string: Self, options: String.CompareOptions = []) -> Index? {
        return range(of: string, options: options)?.upperBound
    }
    func indexes(of string: Self, options: String.CompareOptions = []) -> [Index] {
        var result: [Index] = []
        var start = startIndex
        while start < endIndex,
            let range = self[start..<endIndex].range(of: string, options: options) {
                result.append(range.lowerBound)
                start = range.lowerBound < range.upperBound ? range.upperBound :
                    index(range.lowerBound, offsetBy: 1, limitedBy: endIndex) ?? endIndex
        }
        return result
    }
    func ranges(of string: Self, options: String.CompareOptions = []) -> [Range<Index>] {
        var result: [Range<Index>] = []
        var start = startIndex
        while start < endIndex,
            let range = self[start..<endIndex].range(of: string, options: options) {
                result.append(range)
                start = range.lowerBound < range.upperBound ? range.upperBound :
                    index(range.lowerBound, offsetBy: 1, limitedBy: endIndex) ?? endIndex
        }
        return result
    }
    subscript (i: Int) -> Character {
        return self[index(startIndex, offsetBy: i)]
    }
    subscript (bounds: CountableRange<Int>) -> String {
        let start = index(startIndex, offsetBy: bounds.lowerBound)
        let end = index(startIndex, offsetBy: bounds.upperBound)
        return String(self[start..<end])
    }
    
}
