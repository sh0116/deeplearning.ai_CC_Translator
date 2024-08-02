chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.contentScriptQuery == "translateText") {
      fetch(`https://api.deepl.com/v2/translate`, {
        method: 'POST',
        headers: {
          'Authorization': `DeepL-Auth-Key ${request.authKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          text: [request.text],
          target_lang: request.targetLang
        })
      })
      .then(response => response.json())
      .then(data => sendResponse({translatedText: data.translations[0].text}))
      .catch(error => console.error('Error:', error));
      return true;  // Will respond asynchronously.
    }
  }
);
