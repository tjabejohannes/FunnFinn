let priceFields = getPriceFields();

const findPriceFields = setInterval(function () {
    if (!priceFields.priceTo || !priceFields.priceFrom) {
        priceFields = getPriceFields();
    } else {
        clearInterval(findPriceFields);
        Object.keys(priceFields).map(function(key, index) {
            priceFields[key].addEventListener("input", function () {
                this.value = getThousandSeparated(this.value);
            });
        })
    }
}, 1000)

setTimeout(function () {
    clearInterval(findPriceFields); // Om den ikke finner feltet innen 9 sek, bare drit i det
}, 9000);

function getPriceFields() {
    return {
        priceTo: document.getElementsByName("PRICE_TO")[0],
        priceFrom: document.getElementsByName("PRICE_FROM")[0]
    }
}

function getThousandSeparated(value) {
    return value.replace(/ /g, "").replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, " ");
}