const addressString = getAddressString();
const address = parseAddress(addressString);

// Get stored destination and finish building button
browser.storage.local.get("destination").then((data) => {
    const destinationAddress = data.destination ? parseAddress(data.destination) : undefined;
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

function parseAddress(addressString) {
    return addressString.trim().replace(/\s+/g, "+");
}

function getElementByXpath(path) {
    return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

function generateHrefStringbuilder(address) {
    return `https://www.google.com/maps/place/${address}`;
}

function generateHrefDirections(address, destinationAddress) {
    return `https://www.google.com/maps/dir/${address}/${destinationAddress}`;
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