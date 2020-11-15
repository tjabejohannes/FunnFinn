const addressString = getElementByXpath("/html/body/main/div/div[4]/div[1]/div/section[1]/p").firstChild.textContent;
const destinationAddressString = "Oslo sentralstasjon, 0154 oslo";
const showDirections = true;
const address = createAddressObjectWithLatLon(addressString);

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
    const adressReg = /^\D+/
    const streetNumberRegex = /(?<=\S\s+)\d+\D?/;
    const postalCodeRegex = /(?<=, )\d{4}/;
    console.log(addressString)

    const streetName = addressString.match(adressReg)
    const streetAdressNummber = addressString.match(streetNumberRegex) ? addressString.match(streetNumberRegex) : ""; // Vet det er stygt, skal fikse senere
    const postalcode = addressString.match(postalCodeRegex) ? addressString.match(postalCodeRegex) : "";
    console.log("streetname: " + streetName)
    console.log("address number: " + streetAdressNummber)
    console.log("postalcode: " + postalcode)
    return {
        "streetName": streetName,
        "streetNumber": streetAdressNummber,
        "postalCode": postalcode
    }
}

function generateHrefStringbuilder(address){
    let res = "https://www.google.com/maps/place/";

    if (address.streetName) res += address.streetName;
    if (address.streetNumber) res += "+" + address.streetNumber;
    if ((address.streetName) || (address.streetNumber)) res += ",";
    if (address.postalCode) res += "+" + address.postalCode;
    if (address.lat && address.lon) res += "/@" + address.lat + "," + address.lon;

    return res;
}

function generateHrefDirections(address, destinationAddress) {
    let res = "https://www.google.com/maps/dir/";

    if (destinationAddress.streetName) res += destinationAddress.streetName;
    if (destinationAddress.streetNumber) res += "+" + destinationAddress.streetNumber;
    if ((destinationAddress.streetName) || (destinationAddress.streetNumber)) res += ",";
    if (destinationAddress.postalCode) res += "+" + destinationAddress.postalCode;
    res += "/";

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
    button.href = showDirections && destinationAddress ? generateHrefDirections(address, destinationAddress) : generateHrefStringbuilder(address);
    button.target = "_blank"; // Open in new tab
    button.rel = "noopener noreferrer";
    button.id = "google-maps-button";
    
    button.appendChild(icon)
    return button;
}

function insertButtonToPage(button) {
    const buttonContainer = getElementByXpath("/html/body/main/div/div[4]/div[1]/div/div[1]/div/div");
    buttonContainer.appendChild(button);
}

function updateButton(changes) {
    const button = document.getElementById("google-maps-button");
    const newAddress = changes.destination.newValue;

    if(newAddress) {
        const newAddressObject = createAddressObject(changes.destination.newValue);
        button.href = generateHrefDirections(address, newAddressObject);
    } else {
        button.href = generateHrefStringbuilder(address);
    }
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
