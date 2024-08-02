async function translateText(text) {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage({
      contentScriptQuery: "translateText",
      text: text,
      targetLang: 'KO',  // 번역을 한국어로 설정
      authKey: '672b62eb-669c-44a6-8537-195b8b99a552:fx'  // 여기에 실제 DeepL 인증키를 입력하세요
    }, response => {
      if (response.translatedText) {
        resolve(response.translatedText);
      } else {
        reject("Translation failed");
      }
    });
  });
}

async function fetchAndReplaceCaptions() {
  document.querySelectorAll('.vds-video-layout .vds-captions div[data-part="cue"]').forEach(async (element) => {
    const originalText = element.innerText.replace(/\n/g, ' ');
    const translatedText = await translateText(originalText);  // 번역 함수를 호출
    element.innerText = translatedText;  // 원래 자막 위치에 번역된 텍스트로 대체
  });
}

setInterval(() => {
  fetchAndReplaceCaptions();
}, 1000);  // 1초 간격으로 자막을 업데이트
