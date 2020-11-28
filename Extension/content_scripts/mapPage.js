let priceTo = getPriceTo();
let priceFrom = getPriceFrom();

const findPriceField = setInterval(function () {
    if (!priceTo || !priceFrom) {
        priceTo = getPriceTo();
        priceFrom = getPriceFrom();
    } else {
        clearInterval(findPriceField);
        priceTo.addEventListener("input", function () {
            this.value = getThousandSeparated(this.value);
        });
        priceFrom.addEventListener("input", function () {
            this.value = getThousandSeparated(this.value);
        });
    }
}, 1000)

setTimeout(function () {
    clearInterval(findPriceField); // Om den ikke finner feltet innen 9 sek, bare drit i det
}, 9000);


function getPriceTo() {
    return document.getElementsByName("PRICE_TO")[0];
}

function getPriceFrom() {
    return document.getElementsByName("PRICE_FROM")[0];
}

function getThousandSeparated(value) {
    return value.replace(/ /g, "").replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, " ");
}