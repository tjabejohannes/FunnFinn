const addressString = getAddressString();
const address = createAddressObject(addressString);

// Get stored destination and finish building button
browser.storage.local.get("destination").then((data) => {
    const destinationAddress = data.destination ? createAddressObject(data.destination) : undefined;
    const button = createIconButton(address, destinationAddress);
    insertButtonToPage(button);
});

// When destination address changes
browser.storage.onChanged.addListener((changes) => {
    updateButton(changes);
});


// UTIL FUNCTIONS //

function getAddressString() {
    // Fetches text over static map image
    return document.querySelector('a[href*="https://kart.finn.no"]').parentElement.previousElementSibling.textContent;
}

function getElementByXpath(path) {
    return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

function createAddressObject(addressString) {
    const adressReg = /(?!\d{4})^\S+(?<!,)/
    const streetNumberRegex = /(?<=\S\s+)(?!\d{4})\d+\w?/;
    const postalCodeRegex = /\d{4}/;
    const postalPlaceRegex = /(?<=\d{4}\s)\S+/;

    const streetName = addressString.match(adressReg)
    const streetAdressNummber = addressString.match(streetNumberRegex) ? addressString.match(streetNumberRegex) : ""; // Vet det er stygt, skal fikse senere
    const postalcode = addressString.match(postalCodeRegex) ? addressString.match(postalCodeRegex) : "";
    const postalPlace = addressString.match(postalPlaceRegex) ? addressString.match(postalPlaceRegex) : "";
    return {
        "streetName": streetName,
        "streetNumber": streetAdressNummber,
        "postalCode": postalcode,
        "postalPlace": postalPlace
    }
}

function generateHrefStringbuilder(address) {
    return `https://www.google.com/maps/place/${formatAddressHref(address)}`;
}

function generateHrefDirections(address, destinationAddress) {
    return `https://www.google.com/maps/dir/${formatAddressHref(address)}/${formatAddressHref(destinationAddress)}`;
}

function formatAddressHref(address) {
    let res = "";
    if (address.streetName) res += address.streetName;
    if (address.streetNumber) res += "+" + address.streetNumber;
    if (res !== "" && address.postalCode) res += ",";
    if (address.postalCode) res += "+" + address.postalCode;
    if (address.postalPlace) res += "+" + address.postalPlace;
    return res;
}

function createIconButton(address, destinationAddress) {
    const iconLink = browser.runtime.getURL("images/MapsGoogle.png");

    const icon = document.createElement('img')
    icon.src = iconLink
    icon.width = 24;

    const button = document.createElement('a');
    button.className = "button button--pill"
    button.title = "Åpne i Google Maps";
    button.href = destinationAddress ? generateHrefDirections(address, destinationAddress) : generateHrefStringbuilder(address);
    button.target = "_blank"; // Open in new tab
    button.rel = "noopener noreferrer";
    button.id = "google-maps-button";

    button.appendChild(icon)
    return button;
}

function insertButtonToPage(button) {
    let buttonContainer = getElementByXpath("/html/body/main/div/div[4]/div[1]/div/div[1]/div/div");
    if (!buttonContainer) {
        buttonContainer = getElementByXpath("/html/body/main/div/div[3]/div[1]/article/div[2]");
    }
    if(!buttonContainer){
        buttonContainer = document.getElementsByClassName("button button--has-icon button--pill icon icon--twitter")[0].parentElement
    }
    buttonContainer.appendChild(button);
}

function updateButton(changes) {
    const button = document.getElementById("google-maps-button");
    const newAddress = changes.destination.newValue;

    if (newAddress) {
        const newAddressObject = createAddressObject(changes.destination.newValue);
        button.href = generateHrefDirections(address, newAddressObject);
    } else {
        button.href = generateHrefStringbuilder(address);
    }
}