var result = "";
document.getElementById('saveBtn').addEventListener('click', () => {
  const ChatGPTapiToken = document.getElementById('ChatGPTapiToken').value;
  const GeminiapiToken = document.getElementById('GeminiapiToken').value;
  browser.storage.local.set({ ChatGPTapiToken : ChatGPTapiToken })
    .then(() => {result = "ChatGPT API token saved"})
    .catch(error => {console.error('Error saving API token:', error)});
  browser.storage.local.set({ GeminiapiToken : GeminiapiToken })
    .then(() => {result += " + Gemini API token saved"})
    .catch(error => {console.error('Error saving API token:', error)});
  result = "";
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
