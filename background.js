async function getAPIToken() {
  const result = await browser.storage.local.get('apiToken');
  return result.apiToken;
}

async function getReformulationFromChatGPT(text) {
  const apiKey = await getAPIToken(); 
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: "gpt-4-turbo", 
      messages: [
        { "role": "system", "content": "Agis en tant qu'assistant pour reformuler les textes de manière professionelle." },
        { "role": "user", "content": `Reformule le message suivant de manière professionelle: ${text}` }
      ]
    })
  });

  const data = await response.json();
  return data.choices[0].message.content;
}

browser.contextMenus.create({
  id: "get-chatgpt-rewording",
  title: "Reformuler avec ChatGPT",
  contexts: ["selection"]
});

browser.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "get-chatgpt-rewording") {
    getReformulationFromChatGPT(info.selectionText)
      .then(rewording => {
        // Send the reworded message back to the content script 
        browser.tabs.sendMessage(tab.id, { 
          action: "displayReworded", 
          rewording: rewording 
        });
      })
      .catch(error => console.error("Error fetching rewording:", error));
  }
});
