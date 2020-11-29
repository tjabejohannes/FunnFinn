const browser = chrome || browser

// INIT //
addpricePrAreaScript();

function addpricePrAreaScript() {
  const script = document.createElement('script');
  script.src = browser.runtime.getURL('web_accessible_resources/scripts/addPricePrArea.js');
  script.onload = function() {
      this.remove();
  };
  (document.head || document.documentElement).appendChild(script);
}