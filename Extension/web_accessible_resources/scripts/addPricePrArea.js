// INIT //
addPricePerArea();

function addPricePerArea() {
  const ads = Array.from(document.getElementsByClassName("ads__unit__content__keys"));

  ads.forEach((element) => {
    if (isValid(element)) {
      const price = element.children[1].innerHTML.match(/\d+/g).join("");
      const area = element.children[0].innerHTML.match(/\d+/g).join("");
      const pricePrArea = Math.round(parseFloat(price / area));

      const pricePrAreaElm = document.createElement("div");
      pricePrAreaElm.innerHTML = getThousandSeparated(pricePrArea) + " kr/m²";

      element.insertBefore(pricePrAreaElm, element.children[1]);
    }
  });
}

// UTIL FUNCTIONS //
function getThousandSeparated(number) {
  const parts = number.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return parts.join(".");
}

function isValid(arr) {
  if (
    arr.children[0] ?.innerHTML &&
      arr.children[1] ?.innerHTML &&
      !arr.children[2] &&
      !(arr.children[0].innerHTML + arr.children[1].innerHTML).includes("-")) {
    return true;
  }
  return false;
}

// EVENTLITENERS //
// Needs to run function again if the user switches the page 
window.addEventListener('locationchange', function () {
  clearUkensBolig();
  addPricePerArea();
})

history.pushState = (f => function pushState() {
  const ret = f.apply(this, arguments);
  window.dispatchEvent(new Event('pushstate'));
  window.dispatchEvent(new Event('locationchange'));
  return ret;
})(history.pushState);

history.replaceState = (f => function replaceState() {
  const ret = f.apply(this, arguments);
  window.dispatchEvent(new Event('replacestate'));
  window.dispatchEvent(new Event('locationchange'));
  return ret;
})(history.replaceState);

window.addEventListener('popstate', () => {
  window.dispatchEvent(new Event('locationchange'));
});

function clearUkensBolig() {
  const ukensBolig = document.getElementsByClassName("status--sponsored")[0].parentElement.parentElement;
  ukensBolig.getElementsByClassName("ads__unit__content__keys")[0].childNodes[0].remove();
}