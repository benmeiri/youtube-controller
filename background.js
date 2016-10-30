
var tabToListen;

chrome.browserAction.onClicked.addListener(function(tab) { 
  tabToListen = tab.id;
    chrome.tabs.query({}, function(tabs) {

        for (var i = 0; i < tabs.length; ++i) {
            chrome.tabs.sendMessage(tabs[i].id, {stop: true}, function (response) {
            });

        }
    });
});


chrome.tabs.onRemoved.addListener(function(tabId){
  if (tabToListen === tabId){
    tabToListen = undefined;
  }
});


chrome.commands.onCommand.addListener(function(command){
  if (command === "youtube-playpause" && tabToListen){
    chrome.tabs.sendMessage(tabToListen, {toggle: true}, function(response) { }); 
  }
  if (command === "youtube-stopall"){

    chrome.tabs.query({}, function(tabs) {
      
    for (var i=0; i<tabs.length; ++i) {        
      chrome.tabs.sendMessage(tabs[i].id, {stop: true}, function(response) { }); 

    }
  });
  }
});