// Currently, the createPopup function takes one by one the rewordedTexts array and creates a new paragraph element for each item in the array.
// Modify the createPopup function to loop through the rewordedTexts array and create a new paragraph element for each item in the array.
//
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

  for (let i = 0; i < rewordedTexts.length; i++) {
    const textContent = document.createElement('p');
    textContent.textContent = rewordedTexts[i];
    popup.appendChild(textContent);

    if (i < rewordedTexts.length - 1) {
      const lineBreak = document.createElement('hr');
      lineBreak.style.margin = '10px 0';
      popup.appendChild(lineBreak);
    }
  }

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
