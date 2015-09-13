doneSound = new Audio();
doneSound.src = "done.wav";

var idInt = 0;
chrome.browserAction.onClicked.addListener(function(tab) {
  $.get("http://mtny.mobi/api/?url=" + encodeURI(tab.url), function(data) {
      idInt++;
      var stringId = "notification" + idInt;
      chrome.notifications.create(
        stringId,
        {
          type: "basic",
          title: "NotURL Created!",
          message: "You can use your clipboard to paste the NotURL.",
          iconUrl: "checkmark.png",
        }
      );
      doneSound.play();
      var urlBox = document.createElement('input');
      urlBox.type = "text";
      urlBox.value = data.replace("http://mtny.mobi/", "?") + "?";
      document.body.appendChild(urlBox);
      urlBox.select();
      document.execCommand('copy', false, null);
  });
});


chrome.tabs.onUpdated.addListener(function(tabId){
  chrome.tabs.executeScript(tabId, {
      file: "NotURLify.js",
      runAt: "document_end"
  });
});
