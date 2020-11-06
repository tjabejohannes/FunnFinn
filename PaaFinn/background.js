browser.runtime.onMessage.addListener(handleMessage);

function handleMessage(request, sender, sendResponse) {
    const currentDestination = localStorage.getItem("destination");

    sendResponse({destination: currentDestination});
  }