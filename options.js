document.getElementById('saveBtn').addEventListener('click', () => {
  const token = document.getElementById('apiToken').value;
  
  browser.storage.local.set({ apiToken: token })
    .then(() => {
      // Optionally display a success message to the user
      alert('API token saved successfully!');
    })
    .catch(error => {
      console.error('Error saving API token:', error);
      // Display an error message to the user
    });
});

// Load existing token (if any) on page load
browser.storage.local.get('apiToken')
  .then(result => {
    if (result.apiToken) {
      document.getElementById('apiToken').value = result.apiToken;
    }
  });
