// INIT //
addPricePerArea();

function addPricePerArea() {
  let ads = Array.from(document.getElementsByClassName("ads__unit__content__keys"));

  ads.forEach((element) => {
    if (valid(element)) {
      const price = element.children[1].innerHTML.match(/\d+/g).join("");
      const area = element.children[0].innerHTML.match(/\d+/g).join("");
      const pricePrArea = Math.round(parseFloat(price / area));

      let pricePrAreaElm = document.createElement("div");
      pricePrAreaElm.innerHTML = numberWithSpaces(pricePrArea) + " kr/m²";

      element.insertBefore(pricePrAreaElm, element.children[1]);
    }
  });
}

// UTIL FUNCTIONS //
function numberWithSpaces(x) {
  let parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return parts.join(".");
}

function valid(arr){
  if( arr.children[0]?.innerHTML &&
      arr.children[1]?.innerHTML &&
     !arr.children[2] && 
     !(arr.children[0].innerHTML+arr.children[1].innerHTML).includes("-")){
      return true;
    }   
  return false;
}

// EVENTLITENERS //
// Needs to run function again if the user switches the page 
window.addEventListener('locationchange', function(){
  addPricePerArea();
})

history.pushState = ( f => function pushState(){
  let ret = f.apply(this, arguments);
  window.dispatchEvent(new Event('pushstate'));
  window.dispatchEvent(new Event('locationchange'));
  return ret;
})(history.pushState);

history.replaceState = ( f => function replaceState(){
  let ret = f.apply(this, arguments);
  window.dispatchEvent(new Event('replacestate'));
  window.dispatchEvent(new Event('locationchange'));
  return ret;
})(history.replaceState);

window.addEventListener('popstate',()=>{
  window.dispatchEvent(new Event('locationchange'))
});