chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    const API_KEY = "";
    if (request.action === "translateText") {
      const { text, targetLanguage } = request.data;

      fetch('https://api-free.deepl.com/v2/translate', {
        method: 'POST',
        headers: {
          'Authorization': `DeepL-Auth-Key ${API_KEY}`, // 替换为你的授权密钥
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          text: [text],
          target_lang: targetLanguage
        })
      })
      .then(response => response.json())
      .then(data => {
        if (data.translations && data.translations.length > 0) {
          sendResponse({ success: true, translation: data.translations[0].text });
        } else {
          sendResponse({ success: false, error: 'No translations found' });
        }
      })
      .catch(error => {
        console.error('Error:', error);
        sendResponse({ success: false, error: error.toString() });
      });

      return true; // indicates we will respond asynchronously
    }
  }
);
