document.getElementById('saveBtn').addEventListener('click', () => {
  var result = ""; 
  const ChatGPTapiToken = document.getElementById('ChatGPTapiToken').value;
  const GeminiapiToken = document.getElementById('GeminiapiToken').value;
  browser.storage.local.set({ ChatGPTapiToken: ChatGPTapiToken })
    .then(() => {
      result += "ChatGPT API token saved"; 
      browser.storage.local.set({ GeminiapiToken: GeminiapiToken })
        .then(() => {
          result += "\nGemini API token saved"; 
          alert(result); 
        })
        .catch(error => { console.error('Error saving Gemini API token:', error); });
    })
    .catch(error => { console.error('Error saving ChatGPT API token:', error); });
});


browser.storage.local.get('ChatGPTapiToken')
  .then(result => {
    if (result.ChatGPTapiToken) {
      document.getElementById('ChatGPTapiToken').value = result.ChatGPTapiToken;
    }
  });

browser.storage.local.get('GeminiapiToken')
  .then(result => {
    if (result.GeminiapiToken) {
      document.getElementById('GeminiapiToken').value = result.GeminiapiToken
    }
  });
