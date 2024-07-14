document.getElementById('saveBtn').addEventListener('click', () => {
  const token = document.getElementById('ChatGPTapiToken').value;
  
  browser.storage.local.set({ ChatGPTapiToken : token })
    .then(() => {
      // Optionally display a success message to the user
      alert('ChatGPT API token saved successfully!');
    })
    .catch(error => {
      console.error('Error saving API token:', error);
      // Display an error message to the user
    });
});

// Load existing token (if any) on page load
browser.storage.local.get('ChatGPTapiToken')
  .then(result => {
    if (result.ChatGPTapiToken) {
      document.getElementById('ChatGPTapiToken').value = result.ChatGPTapiToken;
    }
  })
