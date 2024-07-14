
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

  const rewordedTexts = rewordedText.split(' -------- ');

  const textContent1 = document.createElement('p');
  textContent1.textContent = rewordedTexts[0];
  popup.appendChild(textContent1);

  // Add a line break to separate the two reworded texts
  const lineBreak = document.createElement('hr');
  lineBreak.style.margin = '10px 0';
  popup.appendChild(lineBreak);

  const textContent2 = document.createElement('p');
  textContent2.textContent = rewordedTexts[1];
  popup.appendChild(textContent2);

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
  const popup = createPopup(rewordedText);
  document.body.appendChild(popup);
}

browser.runtime.onMessage.addListener((message) => {
  if (message.action === "displayReworded") {
    displayRewordedText(message.rewording);
  }
});
