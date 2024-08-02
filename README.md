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
