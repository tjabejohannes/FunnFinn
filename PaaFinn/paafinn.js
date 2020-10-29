const address = createAddressObject();
const button = createIconButton(address);
const buttonContainer = getElementByXpath("/html/body/main/div/div[4]/div[1]/div/div[1]/div/div");

buttonContainer.appendChild(button);

// Debugging
console.log("Gatenavn: " + address.streetName + ", Gatenummer: " + address.streetNumber + ", Postnummer: " + address.postalCode)
console.log("Latetude: "+ address.lat+" Longetude: "+address.lon);
console.log(buttonContainer)

// UTIL FUNCTIONS //

//#region Helpers
function generateHrefStringbuilder(streetName,streetAdressNummber,postalcode,lat,long){
    res = "https://www.google.com/maps/place/"
    if (streetName !== null) res+=streetName
    if (streetAdressNummber !== null) res+="+"+streetAdressNummber
    if ((streetName !== null)||(streetAdressNummber !== null)) res+=","
    if (postalcode!== null) res+= "+"+postalcode
    if ((lat !== null) && (long !== null)) res+="/@"+lat+","+long
    return res
}

function getElementByXpath(path) {
    return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}
//#endregion

function getHousingType() {
    const pathname = window.location.pathname;
    const pathnameRegex = /(?<=\/)[^\/]*(?=\/)/g; // Matches anything encapsulated by two "/", that is not itself a "/"
    return pathname.match(pathnameRegex)[1];
}

function createIconButton(address) {
    const iconLink = browser.runtime.getURL("images/MapsGoogle.png/")
    
    const icon = document.createElement('img')
    icon.src = iconLink  
    icon.width = 24;

    const button = document.createElement('a');
    button.className = "button button--pill"
    button.title = "Åpne i Google Maps";
    button.href = generateHrefStringbuilder(address.streetName, address.streetNumber, address.postalCode, address.lat,address.long);
    button.target = "_blank";
    button.rel = "noopener noreferrer";
    
    button.appendChild(icon)
    return button;
}


function createAddressObject() {
    const adressUnparsed = getElementByXpath("/html/body/main/div/div[4]/div[1]/div/section[1]/p").firstChild.textContent;
    const adressReg = /^\D+/g
    const streetNumberRegex = /\d+\D?(?=,)/g;
    const postalCodeRegex = /(?<=, )\d{4}/g;
    console.log(adressUnparsed)

    const streetName = adressUnparsed.match(adressReg)
    const streetAdressNummber = adressUnparsed.match(streetNumberRegex) ? adressUnparsed.match(streetNumberRegex)[0] : ""; // Vet det er stygt, skal fikse senere
    const postalcode = adressUnparsed.match(postalCodeRegex)[0];

    // Using regular expression to get the lat long coordinates
    const latlongReg = /\d+[.]+\d+/g;  
    const sectionNumber = getHousingType() === "lettings" ? 4 : 5;
    const imageSrc = getElementByXpath(`/html/body/main/div/div[4]/div[1]/div/section[${sectionNumber}]/div/a/img`).src;
    console.log(imageSrc)
    const latlong = imageSrc.match(latlongReg)
    const lat  = latlong[0]
    const lon = latlong[1]
    
    return {
        "streetName": streetName,
        "streetNumber": streetAdressNummber,
        "postalCode": postalcode,
        "lat": lat,
        "lon": lon
    }
}

