const addressString = getElementByXpath("/html/body/main/div/div[4]/div[1]/div/section[1]/p").firstChild.textContent;
const destinationAddressString = "Oslo sentralstasjon, 0154 oslo";
const showDirections = true;
const address = createAddressObjectWithLatLon(addressString);

browser.storage.local.get("destination").then((data) => {
    const destinationAddress = createAddressObject(data.destination);
    const button = createIconButton(address, destinationAddress);
    const buttonContainer = getElementByXpath("/html/body/main/div/div[4]/div[1]/div/div[1]/div/div");
    buttonContainer.appendChild(button);
});

// Debugging
console.log("Gatenavn: " + address.streetName + ", Gatenummer: " + address.streetNumber + ", Postnummer: " + address.postalCode)
console.log("Gatenavn: " + destinationAddress.streetName + ", Gatenummer: " + destinationAddress.streetNumber + ", Postnummer: " + destinationAddress.postalCode)
console.log("Latetude: "+ address.lat+" Longetude: "+address.lon);
console.log(buttonContainer)

// UTIL FUNCTIONS //

function getElementByXpath(path) {
    return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

function createAddressObjectWithLatLon(addressString) {
    const addressObject = createAddressObject(addressString);
    const latLon = getLatLon();
    addressObject.lat = latLon[0]
    addressObject.lon = latLon[1]

    return addressObject;
}

function createAddressObject(addressString) {
    const adressReg = /^\D+/g
    const streetNumberRegex = /\d+\D?(?=,)/g;
    const postalCodeRegex = /(?<=, )\d{4}/g;
    console.log(addressString)

    const streetName = addressString.match(adressReg)
    const streetAdressNummber = addressString.match(streetNumberRegex) ? addressString.match(streetNumberRegex)[0] : ""; // Vet det er stygt, skal fikse senere
    const postalcode = addressString.match(postalCodeRegex)[0];
    
    return {
        "streetName": streetName,
        "streetNumber": streetAdressNummber,
        "postalCode": postalcode
    }
}

function generateHrefStringbuilder(address){
    res = "https://www.google.com/maps/place/";

    if (address.streetName) res += address.streetName;
    if (address.streetNumber) res += "+" + address.streetNumber;
    if ((address.streetName) || (address.streetNumber)) res += ",";
    if (address.postalCode) res += "+" + address.postalCode;
    if (address.lat && address.lon) res += "/@" + address.lat + "," + address.lon;

    return res;
}

function generateHrefDirections(address, destinationAddress) {
    res = "https://www.google.com/maps/dir/";

    if (destinationAddress.streetName) res += destinationAddress.streetName;
    if (destinationAddress.streetNumber) res += "+" + destinationAddress.streetNumber;
    if ((destinationAddress.streetName) || (destinationAddress.streetNumber)) res += ",";
    if (destinationAddress.postalCode) res += "+" + destinationAddress.postalCode + "/";

    if (address.streetName) res += address.streetName;
    if (address.streetNumber) res += "+" + address.streetNumber;
    if ((address.streetName) || (address.streetNumber)) res += ","
    if (address.postalCode) res += "+" + address.postalCode;
    if (address.lat && address.lon) res += "/@" + address.lat + "," + address.lon;

    return res;
}

function createIconButton(address, destinationAddress) {
    const iconLink = browser.runtime.getURL("images/MapsGoogle.png/")
    
    const icon = document.createElement('img')
    icon.src = iconLink  
    icon.width = 24;

    const button = document.createElement('a');
    button.className = "button button--pill"
    button.title = "Åpne i Google Maps";
    //button.href = generateHrefStringbuilder(address.streetName, address.streetNumber, address.postalCode, address.lat,address.long);
    button.href = generateHrefDirections(address, destinationAddress);
    button.href = showDirections ? generateHrefDirections(address, destinationAddress) : generateHrefStringbuilder(address);
    button.target = "_blank"; // Open in new tab
    button.rel = "noopener noreferrer";
    
    button.appendChild(icon)
    return button;
}

function getLatLon() {
    const latlongReg = /\d+[.]+\d+/g;  
    const sectionNumber = getHousingType() === "lettings" ? 4 : 5;
    const imageSrc = getElementByXpath(`/html/body/main/div/div[4]/div[1]/div/section[${sectionNumber}]/div/a/img`).src;
    console.log(imageSrc)
    const latlong = imageSrc.match(latlongReg)
    return latlong;
}

function getHousingType() {
    const pathname = window.location.pathname;
    const pathnameRegex = /(?<=\/)[^\/]*(?=\/)/g; // Matches anything encapsulated by two "/", that is not itself a "/"
    return pathname.match(pathnameRegex)[1];
}
