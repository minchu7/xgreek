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

class ViewController: UIViewController, WKUIDelegate, WKScriptMessageHandler{
    
    var webView: WKWebView!
    override func viewDidLoad() {
        super.viewDidLoad()
        
        //javascript interface
        let contentController = WKUserContentController()
        contentController.add( self, name: "vibrateAction")
        
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
        }
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
