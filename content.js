document.querySelectorAll('p').forEach(p => {
    const originalText = p.innerText;
    // 首先讀取存儲的目標語言，然後進行翻譯
    chrome.storage.sync.get('targetLanguage', function(data) {
        const targetLanguage = data.targetLanguage || 'EN'; // 如果沒有設定，默認為英語
        translateTextInContentScript(originalText, targetLanguage, (translatedText) => {
            const font = document.createElement('font');
            font.setAttribute('color', 'blue');
            font.innerText = translatedText;
            p.appendChild(font);
        });
    });
});
function translateTextInContentScript(text, targetLanguage, callback) {
    chrome.runtime.sendMessage({
        action: "translateText",
        data: { text, targetLanguage }
    }, function(response) {
        if (response.success) {
            console.log('Translated text:', response.translation);
            callback(response.translation); // 使用回调处理翻译后的文本
        } else {
            console.error('Translation error:', response.error);
        }
    });
}
