# deeplearning.ai_CC_Translator
deeplearning.ai_CC_Translator : 딥러닝AI 번역기


# 자막 닫기
const container = document.querySelector('div.sticky.top-0.flex.justify-between.bg-base-200.py-4.pr-4.text-neutral');
const closeButton = container ? container.querySelector('button.btn.btn-circle.btn-ghost.btn-sm') : null;

// 버튼이 존재하면 클릭 이벤트를 발생시킵니다.
if (closeButton) {
    closeButton.click();
    console.log('Close button was clicked successfully!');
} else {
    console.log('Close button not found.');
}


# 자막 열기
const button = document.querySelector('button.vds-button[aria-label="open transcript panel"]');

// 버튼이 존재하면 클릭 이벤트를 발생시킵니다.
if (button) {
    button.click();
    console.log('Button clicked successfully!');
} else {
    console.log('Button not found');
}


# 자막열기 -> 자막 읽기
// 모든 'text-neutral' 클래스를 가진 <p> 태그를 선택합니다.
const paragraphs = document.querySelectorAll('p.text-neutral');

// 각 태그의 텍스트 내용을 배열에 저장합니다.
const texts = Array.from(paragraphs).map(p => p.innerText);

// 결과를 콘솔에 출력합니다.
console.log(texts);

// 선택적으로 화면에 출력할 수도 있습니다.
texts.forEach(text => console.log(text));

# 버튼 생성

function createTranslationButton() {
    const button = document.createElement('button');
    button.className = 'vds-button';  // 기존 버튼과 동일한 스타일을 사용
    button.innerHTML = `<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 20010904//EN"
 "http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd">
<svg version="1.0" xmlns="http://www.w3.org/2000/svg"
 width="40" height="40" viewBox="0 0 192 196"
 preserveAspectRatio="xMidYMid meet">
<g transform="translate(0,196) scale(0.1,-0.1)"
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
</g>
</svg>`;  // SVG 아이콘을 버튼의 innerHTML로 삽입
    button.style.marginLeft = '10px';  // 좌측 여백 추가

    // 기존 자막 버튼 옆에 버튼을 추가
    const captionButton = document.querySelector('button.vds-caption-button');
    if (captionButton) {
        captionButton.parentNode.insertBefore(button, captionButton.nextSibling);
    }

    return button;
}



