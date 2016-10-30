

function click(e) {
//    chrome.tabs.executeScript(null,
//        {code:"document.body.style.backgroundColor='" + e.target.id + "'"});
//    window.close();
    chrome.tabs.query({}, function(tabs) {

        for (var i = 0; i < tabs.length; ++i) {
            chrome.tabs.sendMessage(tabs[i].id, {stop: true}, function (response) {
            });

        }
    });
}


function getToolbarItem(titles){
    $.get(chrome.extension.getURL('/html/toolbarItem.html'), function(view) {
       var $ul = $('<ul></ul>');

        var  $element = $(view);
        for(var i = 0 ; i < titles.length ; i++){
            var $tmpEl = $element.clone();
            $tmpEl.find('.title').text(titles[i].title);
            $tmpEl.find('.toggle').data('tab-id',titles[i].id);
            $ul.append($tmpEl);
        }
        $ul.on('click','.toggle',function(){
            chrome.tabs.sendMessage($(this).data('tab-id'), {toggle: true}, function(response) { });
        });
        $('body').append($ul);

    });
}


window.onload = function () {

    var divs = document.querySelectorAll('div');

    chrome.commands.getAll(function (commands){
        for(var k = 0 ; k < commands.length;k++){
            var command = commands[k];
            if(command.name === 'youtube-stopall'){
                $('#pause-all').text('Pause All (shorcut' + command.shortcut +')')
                break;
            }
        }
    });


    for (var i = 0; i < divs.length; i++) {
        divs[i].addEventListener('click', click);
        var flag = false;
        chrome.tabs.query({}, function(tabs) {
            var titles = [], count = 0, len = tabs.length;
            for (var i = 0; i < len; ++i) {

                (function(j){

                    chrome.tabs.sendMessage(tabs[j].id, {checkLive: true}, function (response) {

                        if(response){
                            titles.push(tabs[j]);
                        }
                        count++;
                        if(count >= len && !flag){
                            flag = true;

                            getToolbarItem(titles);

                        }
                    });
                })(i);

            }
        });
    }
};
