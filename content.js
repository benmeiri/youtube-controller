

var evt = document.createEvent('MouseEvents');
console.log('stop');
evt.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null );
var element;


chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
  
  if (request.toggle){
      element = document.querySelector('#player-api .ytp-play-button');
//      if (!element){
//		  console.log('add element');
//        element = document.querySelector('#player-api .ytp-button-play');
//      }
      if (element){
        element.dispatchEvent(evt);
      }
  }
  if(request.stop){
	  console.log('before stop');
    //var el = document.querySelector('#player-api .ytp-button-pause');
	var el = document.querySelector('#player-api .playing-mode .ytp-play-button');
    if(el){
		console.log('init stop');
      el.dispatchEvent(evt);

    }
  }

      if(request.checkLive && document.querySelector('#player-api ')){
          sendResponse({message: "Alive"});
      }
   
});

