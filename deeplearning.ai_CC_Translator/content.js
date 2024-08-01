function extractSubtitles() {
    const subtitles = [];
    document.querySelectorAll('.text-neutral p').forEach((element) => {
      const time = element.querySelector('.link-primary').innerText;
      const text = element.innerText.replace(time, '').trim();
      subtitles.push({ time, text });
    });
    displaySubtitles(subtitles);
  }
  
  function displaySubtitles(subtitles) {
    document.querySelectorAll('.text-neutral p').forEach((element, index) => {
      const subtitle = subtitles[index];
      if (subtitle) {
        element.innerHTML += `<br><span style='color: blue;'>${subtitle.text}</span>`;
      }
    });
  }
  
  // 페이지 로드 완료 후 자막 추출 및 표시
  window.addEventListener('load', extractSubtitles);
  