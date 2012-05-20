// vim: ts=2 sw=2 expandtab fenc=utf8 :

if (!localStorage.options){
  localStorage.options = JSON.stringify({
      pixivCompleteTags    : ""
    , pixivPartialTags     : ""
    , pixivHideCompleteTags : false
    , pixivHidePartialTags  : false
    , pixivApplyToAll       : true
    , pixivMouseover        : false
    , pixivOpenInNewTab     : false
    , pixivReloadPage       : false
    , pixivCollectorHtml : null
    , pixivTagListDisplay : "block"
  });
}

init();

//end script

window.onbeforeunload = function(){
  ;
};

function init(){

  updateCollectorHtml();

  chrome.browserAction.onClicked.addListener(function(tab){
    var props = { url: "http://www.pixiv.net/" };
    chrome.tabs.create(props, function(newtab){
    });
  });
}

function updateCollectorHtml() {

  var options = JSON.parse(localStorage.options);

  var comptags = (options.pixivCompleteTags != "")
    ?  options.pixivCompleteTags.split('\n')
    :  new Array();

  var parttags = (options.pixivPartialTags != "")
    ?  options.pixivPartialTags.split('\n')
    :  new Array();

  var newDivNode1 = document.createElement('div');
  var newDivNode2 = document.createElement('div');
  var newDivNode3 = document.createElement('div');
  newDivNode1.className = 'pixiv_tag_collector partial';
  newDivNode2.className = 'pixiv_tag_collector complete';

  var newSpanNode1 = document.createElement('span');
  var newSpanNode2 = document.createElement('span');
  newSpanNode1.className = 'mouse_event';
  newSpanNode2.className = 'mouse_event';
  if (options.pixivMouseover) {
    newSpanNode1.style.display = 'none';
    newSpanNode2.style.display = 'none';
  }

  //
  var tmpNode2 = document.createDocumentFragment();

  for (var i = 0; i < comptags.length; i++) {
    var newANode = document.createElement('a');
    newANode.href = 'http://www.pixiv.net/tags.php?tag=' + encodeURIComponent(comptags[i]);
    newANode.appendChild(document.createTextNode(comptags[i]));
    tmpNode2.appendChild(newANode);
  }

  newSpanNode2.appendChild(tmpNode2);
  newDivNode2.appendChild(newSpanNode2);

  //
  var pattern = /(-{2,})+(\d{1,})$/;
  var tmpNode1 = document.createDocumentFragment();

  for (var i = 0; i < parttags.length; i++) {
    var newANode = document.createElement('a');
    newANode.href = 'http://www.pixiv.net/search.php?word=' + encodeURIComponent(parttags[i]).replace(/%20/g, '+').replace(pattern, '').replace(/[+-]$/,'') + '&s_mode=s_tag';
    if (parttags[i].match(pattern)) {
      newANode.appendChild(document.createTextNode('【' +
        (
          (RegExp.$2 < parttags[i].length - RegExp.lastMatch.length　+ 1)
             ? parttags[i].slice(0, RegExp.$2)                     + '...】'
             : parttags[i].slice(0, - RegExp.lastMatch.length - 1) + '】'
           )
        )
      );
    }
    else {
      newANode.appendChild(document.createTextNode('【' + parttags[i] + '】'));
    }
    tmpNode1.appendChild(newANode);
  }

  newSpanNode1.appendChild(tmpNode1);
  newDivNode1.appendChild(newSpanNode1);

  //
  newDivNode3.appendChild(newDivNode2);
  newDivNode3.appendChild(newDivNode1);

  //
  options.pixivTagCollectorHtml = newDivNode3.innerHTML;
  options.pixivTagListDisplay  = "block";

  localStorage.options = JSON.stringify(options);
}

//
chrome.extension.onRequest.addListener(
  function(request, sender, sendResponse) {

    var options = JSON.parse(localStorage.options);

    if (request.action == "getOptions") {
      sendResponse({resultOptions: options});
    }
    else if (request.action == "setPixivTagListDisplay") {
      options.pixivTagListDisplay  = "block";
      localStorage.options = JSON.stringify(options);
      sendResponse({});
    }
    else if (request.action == "resetPixivTagListDisplay") {
      options.pixivTagListDisplay  = "none";
      localStorage.options = JSON.stringify(options);
      sendResponse({});
    }
    else
      sendResponse({}); // Send nothing..
  });

