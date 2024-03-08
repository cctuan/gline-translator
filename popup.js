document.addEventListener('DOMContentLoaded', function() {
    chrome.storage.sync.get('targetLanguage', function(data) {
        if (data.targetLanguage) {
            document.getElementById('languageSelector').value = data.targetLanguage;
        }
    });
});

document.getElementById('save').addEventListener('click', function() {
    const language = document.getElementById('languageSelector').value;
    chrome.storage.sync.set({targetLanguage: language}, function() {
        console.log('翻譯語言設置為 ' + language);
        // 可以在這裡添加一些用戶反饋，比如顯示一個訊息說設定已保存
        document.getElementById('feedbackMessage').innerText = `${language} 设置已保存！`;
        // 可以在这里添加更多逻辑，比如设置消息显示几秒后自动消失
        setTimeout(() => {
            document.getElementById('feedbackMessage').innerText = '';
        }, 3000); // 3秒后消息消失
    });
});