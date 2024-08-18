# deeplearning.ai_CC_Translator
deeplearning.ai_CC_Translator : 딥러닝AI 번역기

let subtitles = []; // 자막 리스트를 저장할 변수

//CC비활성화
function disableDefaultCaptions() {
    
    const captionButtons = document.querySelectorAll('button.vds-caption-button');
    const captionButton = captionButtons[captionButtons.length - 1];
    if (captionButton && captionButton.getAttribute('aria-pressed') === 'true') {
        captionButton.click();
        console.log('기존 자막 비활성화됨');
    } else {
        console.log('기존 자막 이미 비활성화됨');
    }
}

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
        button.style.backgroundColor = "#1E80E2"; 
        button.innerHTML = `
            <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
             width="300pt" height="306pt" viewBox="0 0 300 306"
             preserveAspectRatio="xMidYMid meet">
            <g transform="translate(0,306) scale(0.1,-0.1)"
            fill="#FFFFFF" stroke="none">
            <path d="M1690 2584 c-250 -16 -274 -21 -286 -69 -12 -47 4 -73 74 -121 37
            -26 70 -50 74 -53 4 -3 -4 -46 -17 -96 l-23 -90 -479 -5 c-385 -4 -483 -8
            -503 -19 -56 -31 -90 -65 -112 -109 l-23 -47 -3 -547 c-2 -389 1 -560 9 -590
            7 -28 25 -56 52 -80 l40 -38 281 -2 281 -3 3 -97 3 -98 -60 0 c-63 0 -76 -8
            -66 -40 6 -20 16 -20 759 -20 635 0 755 2 765 14 9 11 7 27 -8 73 -38 115 -36
            230 7 320 23 47 6 61 -76 65 l-67 3 -3 465 -2 465 33 130 c33 125 35 130 63
            136 54 12 104 10 104 -4 0 -30 -32 -118 -45 -123 -8 -3 -21 -16 -29 -29 -28
            -43 10 -104 66 -105 36 0 72 45 63 80 -13 44 -8 93 19 188 20 71 24 97 16 113
            -11 19 -37 37 -350 238 l-165 105 -80 2 c-44 1 -186 -4 -315 -12z m440 -99
            c214 -138 301 -197 297 -202 -3 -2 -72 12 -153 32 -117 29 -155 43 -180 65
            -52 45 -160 60 -201 27 -24 -18 -15 -64 17 -91 47 -39 137 -58 178 -37 11 5
            68 -5 167 -30 83 -21 152 -38 154 -38 42 -7 -246 -38 -385 -43 -68 -2 -73 0
            -140 42 -159 100 -414 273 -414 280 0 10 120 21 500 43 68 4 89 -2 160 -48z
            m-620 -425 c22 -41 246 -137 410 -176 36 -9 121 -21 190 -27 l125 -12 3 -397
            2 -398 -890 0 -891 0 3 459 3 459 30 44 c20 27 44 47 65 55 25 8 164 12 487
            12 443 1 453 1 463 -19z m-110 -1130 c33 -33 22 -87 -21 -111 -48 -25 -115 42
            -90 90 24 43 78 54 111 21z m974 -97 c-4 -16 -9 -31 -11 -35 -2 -5 -134 -8
            -292 -8 -159 0 -302 -3 -320 -6 -101 -20 -111 -158 -14 -195 13 -5 161 -9 328
            -9 267 0 304 -2 309 -16 18 -47 30 -45 -366 -42 -333 3 -376 5 -405 20 -119
            65 -120 236 -3 296 44 22 50 22 412 22 l368 0 -6 -27z"/>
            <path d="M1382 1813 c-14 -13 -31 -61 -55 -158 -20 -77 -50 -195 -67 -263 -31
            -118 -31 -124 -14 -143 22 -25 70 -25 83 0 6 10 21 61 35 112 41 152 106 412
            106 421 0 13 -39 48 -54 48 -8 0 -23 -8 -34 -17z"/>
            <path d="M1060 1673 c-8 -3 -57 -26 -108 -50 -52 -23 -98 -43 -102 -43 -19 0
            -70 -53 -70 -73 1 -37 24 -56 120 -98 51 -22 112 -49 136 -59 70 -32 104 -22
            104 31 0 32 -8 39 -90 74 -101 44 -102 47 -18 84 40 18 81 40 91 48 24 22 21
            59 -5 77 -24 17 -33 18 -58 9z"/>
            <path d="M1583 1665 c-13 -9 -23 -27 -23 -40 0 -29 20 -43 110 -81 36 -15 68
            -30 73 -34 4 -3 -28 -21 -70 -40 -94 -40 -113 -55 -113 -90 0 -55 34 -63 113
            -26 29 13 91 40 138 60 93 40 116 65 105 111 -5 21 -23 33 -84 61 -42 20 -101
            46 -129 60 -75 34 -95 37 -120 19z"/>
            <rect x="0" y="10" width="300" height="20" fill="#FFFFFF" />
            </g>
            </svg>`;
    } else {
        button.style.backgroundColor = ""; 
        button.innerHTML = `
            <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
             width="300pt" height="306pt" viewBox="0 0 300 306"
             preserveAspectRatio="xMidYMid meet">
            <g transform="translate(0,306) scale(0.1,-0.1)"
            fill="#FFFFFF" stroke="none">
            <path d="M1690 2584 c-250 -16 -274 -21 -286 -69 -12 -47 4 -73 74 -121 37
            -26 70 -50 74 -53 4 -3 -4 -46 -17 -96 l-23 -90 -479 -5 c-385 -4 -483 -8
            -503 -19 -56 -31 -90 -65 -112 -109 l-23 -47 -3 -547 c-2 -389 1 -560 9 -590
            7 -28 25 -56 52 -80 l40 -38 281 -2 281 -3 3 -97 3 -98 -60 0 c-63 0 -76 -8
            -66 -40 6 -20 16 -20 759 -20 635 0 755 2 765 14 9 11 7 27 -8 73 -38 115 -36
            230 7 320 23 47 6 61 -76 65 l-67 3 -3 465 -2 465 33 130 c33 125 35 130 63
            136 54 12 104 10 104 -4 0 -30 -32 -118 -45 -123 -8 -3 -21 -16 -29 -29 -28
            -43 10 -104 66 -105 36 0 72 45 63 80 -13 44 -8 93 19 188 20 71 24 97 16 113
            -11 19 -37 37 -350 238 l-165 105 -80 2 c-44 1 -186 -4 -315 -12z m440 -99
            c214 -138 301 -197 297 -202 -3 -2 -72 12 -153 32 -117 29 -155 43 -180 65
            -52 45 -160 60 -201 27 -24 -18 -15 -64 17 -91 47 -39 137 -58 178 -37 11 5
            68 -5 167 -30 83 -21 152 -38 154 -38 42 -7 -246 -38 -385 -43 -68 -2 -73 0
            -140 42 -159 100 -414 273 -414 280 0 10 120 21 500 43 68 4 89 -2 160 -48z
            m-620 -425 c22 -41 246 -137 410 -176 36 -9 121 -21 190 -27 l125 -12 3 -397
            2 -398 -890 0 -891 0 3 459 3 459 30 44 c20 27 44 47 65 55 25 8 164 12 487
            12 443 1 453 1 463 -19z m-110 -1130 c33 -33 22 -87 -21 -111 -48 -25 -115 42
            -90 90 24 43 78 54 111 21z m974 -97 c-4 -16 -9 -31 -11 -35 -2 -5 -134 -8
            -292 -8 -159 0 -302 -3 -320 -6 -101 -20 -111 -158 -14 -195 13 -5 161 -9 328
            -9 267 0 304 -2 309 -16 18 -47 30 -45 -366 -42 -333 3 -376 5 -405 20 -119
            65 -120 236 -3 296 44 22 50 22 412 22 l368 0 -6 -27z"/>
            <path d="M1382 1813 c-14 -13 -31 -61 -55 -158 -20 -77 -50 -195 -67 -263 -31
            -118 -31 -124 -14 -143 22 -25 70 -25 83 0 6 10 21 61 35 112 41 152 106 412
            106 421 0 13 -39 48 -54 48 -8 0 -23 -8 -34 -17z"/>
            <path d="M1060 1673 c-8 -3 -57 -26 -108 -50 -52 -23 -98 -43 -102 -43 -19 0
            -70 -53 -70 -73 1 -37 24 -56 120 -98 51 -22 112 -49 136 -59 70 -32 104 -22
            104 31 0 32 -8 39 -90 74 -101 44 -102 47 -18 84 40 18 81 40 91 48 24 22 21
            59 -5 77 -24 17 -33 18 -58 9z"/>
            <path d="M1583 1665 c-13 -9 -23 -27 -23 -40 0 -29 20 -43 110 -81 36 -15 68
            -30 73 -34 4 -3 -28 -21 -70 -40 -94 -40 -113 -55 -113 -90 0 -55 34 -63 113
            -26 29 13 91 40 138 60 93 40 116 65 105 111 -5 21 -23 33 -84 61 -42 20 -101
            46 -129 60 -75 34 -95 37 -120 19z"/>
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

    // 기존 자막을 비활성화
    disableDefaultCaptions();

    // 자막을 읽을 때까지 대기
    setTimeout(() => {
        readTranscript();

        // 자막을 읽은 후 닫기
        setTimeout(() => {
            closeTranscriptPanel();
        }, 100); // 1초 대기 후 닫기
    }, 200); // 2초 대기 후 자막 읽기
}

// 자막 업데이트 시작
startSubtitleUpdater();

// 새로운 버튼을 생성하고 페이지에 추가
createTranslationButton();

// 자막 프로세스 실행
executeTranscriptProcess();