const browser = chrome || browser

// INIT //
addpricePrAreaScript();

function addpricePrAreaScript() {
  var s = document.createElement('script');
  s.src = browser.runtime.getURL('web_accessible_resources/scripts/addPricePrArea.js');
  s.onload = function() {
      this.remove();
  };
  (document.head || document.documentElement).appendChild(s);
}