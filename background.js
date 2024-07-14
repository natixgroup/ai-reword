// This file has a problem: in browser.contextMenus.onClicked.addListener, the code is made of nested promises.
// This is a bad practice because it makes the code harder to read and maintain.
// Modify the code to use async/await instead of promises in the browser.contextMenus.onClicked.addListener call.
// 
async function getAPIToken(aiEngine) {
  if(aiEngine === 'chatgpt') {
    const result = await browser.storage.local.get('ChatGPTapiToken');
    console.log('ChatGPTapiToken:' + result.ChatGPTapiToken);
    return result.ChatGPTapiToken;
  }
  else if(aiEngine === 'gemini') {
    const result = await browser.storage.local.get('GeminiapiToken');
    console.log('GeminiapiToken:' + result.GeminiapiToken);
    return result.GeminiapiToken;
  }
  else {
    throw new Error('Invalid AI engine');
  }

}

var systemInstruction = "Agis en tant qu'assistant pour reformuler les textes de manière professionelle.";

async function getReformulationFromChatGPT(text) {
  const apiKey = await getAPIToken('chatgpt'); 
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: "gpt-4-turbo", 
      messages: [
        { "role": "system", "content": `${systemInstruction}` },
        { "role": "user", "content": `Reformule le message suivant de manière professionelle: ${text}` }
      ]
    })
  });
  const data = await response.json();
  return data.choices[0].message.content;
}

async function getReformulationFromGemini(text) {
  const apiKey = await getAPIToken('gemini'); 
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "system_instruction":{"parts":{"text": `${systemInstruction}`}},
      "contents":[{"parts":[{"text":`Reformule le message suivant de manière professionelle: ${text}`}]}]})
  }
  );
  const data = await response.json();
  return data.candidates[0].content.parts[0].text;
}

browser.contextMenus.create({
  id: "get-ai-rewording",
  title: "Reformuler avec ChatGPT ou Gemini",
  contexts: ["selection"]
});

browser.contextMenus.onClicked.addListener(async (info, tab) => {
  console.log(info);
  if (info.menuItemId === "get-ai-rewording") {
    try {
      const chatGPTRewording = await getReformulationFromChatGPT(info.selectionText);
      const geminiRewording = await getReformulationFromGemini(info.selectionText);
      
      browser.tabs.sendMessage(tab.id, { 
        action: "displayReworded", 
        rewording: `${chatGPTRewording} -------- ${geminiRewording}`
      });

    } catch (error) {
      console.error("Error fetching rewording:", error);
    }
  }
});
