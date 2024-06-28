
// Function to create the popup element
function createPopup(rewordedText) {
  const popup = document.createElement('div');
  popup.id = 'reworded-text-popup';
  popup.style.backgroundColor = '#f0f0f0';
  popup.style.padding = '20px';
  popup.style.border = '1px solid #ccc';
  popup.style.borderRadius = '5px';
  popup.style.position = 'fixed';
  popup.style.top = '50%';
  popup.style.left = '50%';
  popup.style.transform = 'translate(-50%, -50%)';
  popup.style.zIndex = '1000'; 

  // Add the reworded text to the popup
  const textContent = document.createElement('p');
  textContent.textContent = rewordedText;
  popup.appendChild(textContent);

  // Add a close button to the popup
  const closeButton = document.createElement('button');
  closeButton.textContent = 'Close';
  closeButton.style.marginTop = '10px';
  closeButton.addEventListener('click', () => {
    document.body.removeChild(popup);
  });
  popup.appendChild(closeButton);

  return popup;
}

function displayRewordedText(rewordedText) {
  // Create the popup element
  const popup = createPopup(rewordedText);

  // Append the popup to the body
  document.body.appendChild(popup);
}

browser.runtime.onMessage.addListener((message) => {
  if (message.action === "displayReworded") {
    displayRewordedText(message.rewording);
  }
});
