// vim: ts=2 sw=2 expandtab fenc=utf8 :

GM_addStyle = function(styles) {
    var S = document.createElement('style');
    S.type = 'text/css';
    var T = ''+styles+'';
    T = document.createTextNode(T)
    S.appendChild(T);
    var head = document.getElementsByTagName('head');
    head = head[0]
    head.appendChild(S);
    return;
}

//get all options
var options = null;

chrome.extension.sendRequest({action:"getOptions"}, function(response) {

  options = response.resultOptions;
  if (options == null)
    return;

  GM_addStyle(
    '#GM_config{ opacity: 0.8 !important; border: none !important; -moz-box-shadow: 0 0 10px rgb(0,0,0) !important;}' +
    '#GM_config:hover{ opacity: 1 !important; }' +
    '.complete{ border: 1px solid #B7B7B7; -moz-border-radius: 4px; background-color: #FFFCEB; padding: 4px; margin-bottom: 12px; }' +
    '.partial{ border: 1px solid #B7B7B7; -moz-border-radius: 4px; background-color: #FFF5EE; padding: 4px; margin-bottom: 12px; }' +
    '.pixiv_tag_collector a{margin: 0 12px 4px 0; white-space: nowrap; color: #258FB8 !important;}' +
    '.pixiv_tag_collector a:hover{background-color: transparent !important;}'
  );

  if (options.pixivHideCompleteTags) {
    GM_addStyle('.complete{ display: none !important; }');
  }
  if (options.pixivHidePartialTags) {
    GM_addStyle('.partial{ display: none !important; }');
  }

  document.addEventListener("keydown", function(e){
      if (e.ctrlKey && e.keyCode == 81) {
          if ($('.tag_lists:first').css('display') == 'none') {
              $('.tag_lists').css('display', 'block');
              options.pixivTagListDisplay = "block";
              chrome.extension.sendRequest({action:"setPixivTagListDisplay"}, null);
          }
          else {
              $('.tag_lists').css('display', 'none');
              chrome.extension.sendRequest({action:"resetPixivTagListDisplay"}, null);
          }
      }
  }, true);

  //
  addCollectedPixivTags(document);

  //AutoPagerize
  document.addEventListener('GM_AutoPagerizeNextPageLoaded', function(e){
      unsafeWindow.pixiv.scrollView.add('.ui-scroll-view', e.target);
  },false);
  document.body.addEventListener('AutoPagerize_DOMNodeInserted', function(e){
      addCollectedPixivTags(e.target);
  }, false);

});
 
function addCollectedPixivTags(node)
{
    var xpath;
    var targetNode;
    
    xpath = (node == document) ? './/*[@id="search-result"]' : './/li[contains(concat(" ",normalize-space(@class)," "), " image ")]';
    targetNode = document.evaluate(xpath, node, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    if (targetNode.snapshotLength > 0) {
        createToAdd(node,targetNode);
    }
    else 
    {
        if (options.pixivApplyToAll) {
            xpath = './/div[contains(concat(" ",normalize-space(@class)," "), " contents-east ")]';
            targetNode = document.evaluate(xpath, node, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
            if (targetNode.snapshotLength > 0) {
                createToAdd(node,targetNode);
            }
        }
    }
    
    if (options.pixivOpenInNewTab) {
        xpath = './/a[contains(@href, "member_illust.php?mode=medium")]'
        toMediumNode = document.evaluate(xpath, node, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        if (toMediumNode.snapshotLength > 0) {
            for (var i = 0; i < toMediumNode.snapshotLength; i++) {
                toMediumNode.snapshotItem(i).target = "_blank";
            }
        }
    }
}

function createToAdd(node,targetNode)
{
    /*insert tag lists*/
    var newDivNode = document.createElement('div');
    newDivNode.className      = 'tag_lists';
    newDivNode.style.display  = options.pixivTagListDisplay;
    newDivNode.style.overflow = 'hidden';
    newDivNode.innerHTML      = options.pixivTagCollectorHtml;

    targetNode.snapshotItem(0).parentNode.insertBefore(newDivNode, targetNode.snapshotItem(0));

    /*
    $reg = $('<a/>',{
        'href': 'javascript:void(0)',
        'text': '[[タグリスト編集]]'
        }
    );
    $reg.clone().bind('click', function(){GM_config.open();}).appendTo('div.complete:last > span');
    $reg.clone().bind('click', function(){GM_config.open();}).appendTo('div.partial:last > span');
    */
    
    if (options.pixivMouseover) {
        newDivNode.style.width = '10%';
        newDivNode.style.margin = '0 20px 0 20px';
        var tagLists = node.getElementsByClassName('tag_lists').item(0);
        tagLists.addEventListener("mouseover", function(){
            GM_addStyle('.mouse_event: display inline;')
            node.getElementsByClassName('mouse_event').item(0).style.display = 'inline';
            node.getElementsByClassName('mouse_event').item(1).style.display = 'inline';
            tagLists.style.width = '';
            tagLists.style.margin = '0 20px 0 20px';
        }, true);
        tagLists.addEventListener("mouseout", function(){
            node.getElementsByClassName('mouse_event').item(0).style.display = 'none';
            node.getElementsByClassName('mouse_event').item(1).style.display = 'none';
            tagLists.style.width = '10%';
        }, true);
    }
}

