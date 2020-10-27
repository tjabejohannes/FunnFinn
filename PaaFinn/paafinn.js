
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


//#region Adress 
////Using regular expression to parse the address
const adressUnparsed = getElementByXpath("/html/body/main/div/div[4]/div[1]/div/section[1]/p").firstChild.textContent;
const adressReg = /^\D+/g
const numbersRegex = /\d+/g

const streetName = adressUnparsed.match(adressReg)
const streetAdressNummber = adressUnparsed.match(numbersRegex)[0]
const postalcode = adressUnparsed.match(numbersRegex)[1]

console.log("Gatenavn: "+streetName+"   Gatenummer: "+streetAdressNummber+"  Postnummer: "+postalcode)
//#endregion


//#region Lat Long
// Using regular expression to get the lat long coordinates
const latlongReg = /\d+[.]+\d+/g;  
const imageSrc = getElementByXpath("/html/body/main/div/div[4]/div[1]/div/section[5]/div/a/img").src;
console.log(imageSrc)
const latlong = imageSrc.match(latlongReg)
const lat  = latlong[0]
const long = latlong[1]

console.log("Latetude: "+lat+" Longetude: "+long);
//#endregion


//#region Adding Button
////Creating a button and adding the nessesary attributes
const button = document.createElement('a');
button.className = "button button--has-icon button--pill icon icon--twitter"
button.title = "Go to google maps"
console.log(generateHrefStringbuilder(streetName,streetAdressNummber,postalcode,lat,long))
button.href = generateHrefStringbuilder(streetName,streetAdressNummber,postalcode,lat,long)

//  inserting it into the DOM
const buttonContainer = getElementByXpath("/html/body/main/div/div[4]/div[1]/div/div[1]/div/div");
buttonContainer.appendChild(button);

console.log(buttonContainer)
//#endregion


// DEBUG border:
//document.body.style.border = "5px solid red";



