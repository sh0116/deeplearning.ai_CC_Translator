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

let subtitles = []; // 자막 리스트를 저장할 변수

// 자막 리스트를 설정하는 함수
function setSubtitles(newSubtitles) {
    subtitles = newSubtitles;
}

// 자막을 업데이트하는 함수
function updateSubtitles(currentTime) {
    const captionsDiv = document.querySelector('.vds-captions');
    if (captionsDiv && captionsDiv.getAttribute('aria-hidden') === 'false') {
        // 현재 시간을 기준으로 가장 가까운 이전 자막을 찾기
        const currentSubtitle = subtitles
            .filter(([time]) => {
                const [minutes, seconds] = time.split(':').map(Number);
                const totalSeconds = minutes * 60 + seconds;
                return currentTime >= totalSeconds;
            })
            .pop();

        // 자막 업데이트
        if (currentSubtitle) {
            const [_, text] = currentSubtitle;
            captionsDiv.innerHTML = `
                <div data-part="cue-display" style="--cue-text-align: center; --cue-writing-mode: horizontal-tb; --cue-width: 100%; --cue-top: 70%; --cue-left: 0%; --cue-right: 0%; --cue-bottom: 0.14708171206225132%;">
                    <div data-part="cue" data-id="1">${text}</div>
                </div>`;
        } else {
            captionsDiv.innerHTML = '';
        }
    }
}

// 현재 비디오 재생 시간을 가져오는 함수
function getCurrentTime() {
    const videoElement = document.querySelector('video');
    if (videoElement) {
        return videoElement.currentTime;
    }
    return 0;
}

// 주기적으로 자막을 업데이트하는 함수
function startSubtitleUpdater() {
    setInterval(() => {
        const currentTime = getCurrentTime();
        updateSubtitles(currentTime);
    }, 1000); // 1초마다 업데이트
}

// 새로운 자막 버튼을 생성하는 함수
function createTranslationButton() {
    const captionButton = document.querySelector('button.vds-caption-button');
    if (captionButton) {
        const newButton = captionButton.cloneNode(true);
        newButton.setAttribute('aria-label', 'Translation');
        newButton.setAttribute('data-media-tooltip', 'translation');
        newButton.setAttribute('aria-keyshortcuts', 't');

        captionButton.parentNode.insertBefore(newButton, captionButton);

        newButton.addEventListener('click', () => {
            const isPressed = newButton.getAttribute('aria-pressed') === 'true';
            newButton.setAttribute('aria-pressed', !isPressed);
            if (isPressed) {
                newButton.removeAttribute('data-active');
                newButton.removeAttribute('data-pressed');
            } else {
                newButton.setAttribute('data-active', '');
                newButton.setAttribute('data-pressed', '');
            }
            updateButtonIcon(newButton, !isPressed);
            toggleCaptions(!isPressed);
        });

        updateButtonIcon(newButton, newButton.getAttribute('aria-pressed') === 'true');

        return newButton;
    } else {
        console.error('자막 버튼을 찾을 수 없습니다.');
    }
}

function updateButtonIcon(button, isActive) {
    if (isActive) {
        button.innerHTML = `
            <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
             width="192.000000pt" height="196.000000pt" viewBox="0 0 192.000000 196.000000"
             preserveAspectRatio="xMidYMid meet">
            <g transform="translate(0.000000,196.000000) scale(0.100000,-0.100000)"
            fill="#FFFFFF" stroke="none">
            <path d="M1095 1656 c-93 -6 -176 -15 -182 -19 -18 -11 -16 -62 2 -80 8 -8 30
            -25 49 -36 l34 -21 -15 -60 -15 -59 -308 -3 c-294 -3 -310 -4 -336 -24 -15
            -11 -37 -33 -48 -48 -20 -27 -21 -39 -21 -408 l0 -380 33 -29 32 -29 180 0
            180 0 0 -65 0 -65 -41 0 c-33 0 -40 -3 -37 -18 3 -16 35 -17 483 -20 268 -1
            483 2 488 7 5 5 2 31 -7 62 -20 67 -20 129 -1 176 22 51 14 63 -40 63 l-45 0
            0 300 c0 273 2 308 21 385 l21 85 44 0 c24 0 44 -2 44 -4 0 -17 -27 -76 -43
            -93 -17 -19 -18 -27 -9 -48 23 -50 90 -23 79 32 -3 16 4 61 15 102 24 90 34
            77 -150 195 -160 104 -184 116 -214 115 -13 -1 -99 -7 -193 -13z m347 -116
            c68 -44 119 -80 113 -80 -33 1 -200 51 -216 66 -27 25 -117 26 -132 2 -9 -13
            -7 -22 8 -37 23 -26 88 -45 112 -33 12 6 53 0 123 -18 95 -24 102 -27 70 -33
            -19 -3 -89 -9 -155 -12 l-120 -7 -154 102 c-84 55 -151 104 -147 107 7 8 164
            19 288 21 l87 2 123 -80z m-477 -220 c9 -14 118 -69 180 -90 48 -16 132 -33
            238 -45 l47 -6 0 -255 0 -254 -571 0 -570 0 3 293 c3 309 7 334 52 355 29 14
            613 16 621 2z m-71 -726 c9 -8 16 -22 16 -29 0 -7 -7 -21 -16 -29 -8 -9 -22
            -16 -29 -16 -18 0 -45 27 -45 45 0 18 27 45 45 45 7 0 21 -7 29 -16z m626 -53
            c0 -40 -5 -41 -213 -41 -225 0 -237 -3 -237 -66 0 -57 28 -64 253 -64 186 0
            195 -1 200 -20 5 -20 0 -20 -221 -19 -149 0 -239 4 -261 12 -88 31 -99 149
            -19 194 28 15 498 19 498 4z"/>
            <path d="M882 1158 c-16 -20 -95 -335 -89 -353 4 -8 17 -15 31 -15 28 0 27 -3
            82 207 30 117 35 145 24 158 -15 18 -34 19 -48 3z"/>
            <path d="M605 1039 c-139 -62 -140 -84 -9 -145 52 -24 102 -44 109 -44 19 0
            29 38 16 54 -7 8 -34 24 -62 36 l-51 21 62 30 c51 24 61 32 58 51 -5 34 -42
            33 -123 -3z"/>
            <path d="M1007 1063 c-4 -3 -7 -15 -7 -25 0 -14 18 -27 62 -46 l61 -28 -61
            -27 c-53 -22 -62 -30 -62 -52 0 -14 6 -28 14 -31 19 -7 203 74 211 94 12 31
            -7 50 -90 85 -82 36 -115 44 -128 30z"/>
            </g>
            </svg>`;
    } else {
        button.innerHTML = `
            <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
             width="192.000000pt" height="196.000000pt" viewBox="0 0 192.000000 196.000000"
             preserveAspectRatio="xMidYMid meet">
            <g transform="translate(0.000000,196.000000) scale(0.100000,-0.100000)"
            fill="#FFFFFF" stroke="none">
            <path d="M1095 1656 c-93 -6 -176 -15 -182 -19 -18 -11 -16 -62 2 -80 8 -8 30
            -25 49 -36 l34 -21 -15 -60 -15 -59 -308 -3 c-294 -3 -310 -4 -336 -24 -15
            -11 -37 -33 -48 -48 -20 -27 -21 -39 -21 -408 l0 -380 33 -29 32 -29 180 0
            180 0 0 -65 0 -65 -41 0 c-33 0 -40 -3 -37 -18 3 -16 35 -17 483 -20 268 -1
            483 2 488 7 5 5 2 31 -7 62 -20 67 -20 129 -1 176 22 51 14 63 -40 63 l-45 0
            0 300 c0 273 2 308 21 385 l21 85 44 0 c24 0 44 -2 44 -4 0 -17 -27 -76 -43
            -93 -17 -19 -18 -27 -9 -48 23 -50 90 -23 79 32 -3 16 4 61 15 102 24 90 34
            77 -150 195 -160 104 -184 116 -214 115 -13 -1 -99 -7 -193 -13z m347 -116
            c68 -44 119 -80 113 -80 -33 1 -200 51 -216 66 -27 25 -117 26 -132 2 -9 -13
            -7 -22 8 -37 23 -26 88 -45 112 -33 12 6 53 0 123 -18 95 -24 102 -27 70 -33
            -19 -3 -89 -9 -155 -12 l-120 -7 -154 102 c-84 55 -151 104 -147 107 7 8 164
            19 288 21 l87 2 123 -80z m-477 -220 c9 -14 118 -69 180 -90 48 -16 132 -33
            238 -45 l47 -6 0 -255 0 -254 -571 0 -570 0 3 293 c3 309 7 334 52 355 29 14
            613 16 621 2z m-71 -726 c9 -8 16 -22 16 -29 0 -7 -7 -21 -16 -29 -8 -9 -22
            -16 -29 -16 -18 0 -45 27 -45 45 0 18 27 45 45 45 7 0 21 -7 29 -16z m626 -53
            c0 -40 -5 -41 -213 -41 -225 0 -237 -3 -237 -66 0 -57 28 -64 253 -64 186 0
            195 -1 200 -20 5 -20 0 -20 -221 -19 -149 0 -239 4 -261 12 -88 31 -99 149
            -19 194 28 15 498 19 498 4z"/>
            <path d="M882 1158 c-16 -20 -95 -335 -89 -353 4 -8 17 -15 31 -15 28 0 27 -3
            82 207 30 117 35 145 24 158 -15 18 -34 19 -48 3z"/>
            <path d="M605 1039 c-139 -62 -140 -84 -9 -145 52 -24 102 -44 109 -44 19 0
            29 38 16 54 -7 8 -34 24 -62 36 l-51 21 62 30 c51 24 61 32 58 51 -5 34 -42
            33 -123 -3z"/>
            <path d="M1007 1063 c-4 -3 -7 -15 -7 -25 0 -14 18 -27 62 -46 l61 -28 -61
            -27 c-53 -22 -62 -30 -62 -52 0 -14 6 -28 14 -31 19 -7 203 74 211 94 12 31
            -7 50 -90 85 -82 36 -115 44 -128 30z"/>
            </g>
            </svg>`;
    }
}

function toggleCaptions(isActive) {
    const captionsDiv = document.querySelector('.vds-captions');
    if (captionsDiv) {
        captionsDiv.setAttribute('aria-hidden', !isActive);
        if (!isActive) {
            captionsDiv.innerHTML = '';
        }
    }
}

// 자막 읽기 함수 (업데이트)
function readTranscript() {
    const paragraphs = document.querySelectorAll('p.text-neutral');
    const texts = Array.from(paragraphs).map(p => {
        const time = p.querySelector('span.link-primary') ? p.querySelector('span.link-primary').innerText : '';
        const text = p.querySelector('span:not(.link-primary)') ? p.querySelector('span:not(.link-primary)').innerText : '';
        return [time, text];
    });

    let mergedSubtitles = [];
    let currentSubtitle = ['', ''];

    texts.forEach(([time, text], index) => {
        if (currentSubtitle[0] === '') {
            currentSubtitle[0] = time;
        }

        currentSubtitle[1] += ` ${text}`;

        if (text.trim().endsWith('.') || index === texts.length - 1) {
            mergedSubtitles.push([currentSubtitle[0], currentSubtitle[1].trim()]);
            currentSubtitle = ['', ''];
        }
    });

    subtitles = mergedSubtitles.filter(sub => sub[0] !== '' && sub[1] !== '');
    console.log(subtitles);
}

// 자막 열기 함수
function openTranscriptPanel() {
    const button = document.querySelector('button.vds-button[aria-label="open transcript panel"]');

    if (button) {
        button.click();
        console.log('Button clicked successfully!');
    } else {
        console.log('Button not found');
    }
}

// 자막 닫기 함수
function closeTranscriptPanel() {
    const container = document.querySelector('div.sticky.top-0.flex.justify-between.bg-base-200.py-4.pr-4.text-neutral');
    const closeButton = container ? container.querySelector('button.btn.btn-circle.btn-ghost.btn-sm') : null;

    if (closeButton) {
        closeButton.click();
        console.log('Close button was clicked successfully!');
    } else {
        console.log('Close button not found.');
    }
}

// 실행 함수
function executeTranscriptProcess() {
    openTranscriptPanel();

    // 자막을 읽을 때까지 대기
    setTimeout(() => {
        readTranscript();

        // 자막을 읽은 후 닫기
        setTimeout(() => {
            closeTranscriptPanel();
        }, 1000); // 1초 대기 후 닫기
    }, 2000); // 2초 대기 후 자막 읽기
}

// 자막 업데이트 시작
startSubtitleUpdater();

// 새로운 버튼을 생성하고 페이지에 추가
createTranslationButton();

// 자막 프로세스 실행
executeTranscriptProcess();
