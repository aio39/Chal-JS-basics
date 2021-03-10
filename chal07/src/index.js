const resultWindow = document.querySelector('.result');
const numberButtons = document.querySelectorAll('.num');
const operatorButtons = document.querySelectorAll('.oper');
const equalsButton = document.querySelector('.equals');
const cancelButtons = document.querySelector('.cancel');

let prev = 0;
let next = 0;
let nowOperMode;

console.log(nowOperMode == undefined);
console.log(nowOperMode == null);
console.log(null == undefined);

const refreshResultWindow = (num) => {
  resultWindow.innerHTML = num;
};

const savePrev = (num) => {
  prev = num;
  console.log(`prev ${prev}가 저장되었습니다. ${num}`);
};

const resultWindowNumToPrev = () => {
  prev = resultWindow.innerHTML;
  console.log(`prev: ${prev}`);
};

const operExec = () => {
  next = resultWindow.innerHTML;
  let result;
  switch (nowOperMode) {
    case 'plus':
      result = parseFloat(prev) + parseFloat(next);
      break;
    case 'minus':
      result = parseFloat(prev) - parseFloat(next);
      break;
    case 'multi':
      result = parseFloat(prev) * parseFloat(next);
      break;
    case 'divide':
      result = parseFloat(prev) / parseFloat(next);
      break;
    default:
      console.log('eoprExec에서 오류 발생,');
      break;
  }
  savePrev(result);
};

const operModeChange = (innerHTML) => {
  switch (innerHTML) {
    case '+':
      3;
      nowOperMode = 'plus';
      break;
    case '-':
      nowOperMode = 'minus';
      break;
    case '*':
      nowOperMode = 'multi';
      break;
    case '/':
      nowOperMode = 'divide';
      break;
    default:
      console.log('operString이 아무것에도 속하지 않습니다.');
      break;
  }
};

const operatorClick = (e) => {
  const clickOperator = e.target.innerHTML;
  resultWindowNumToPrev();
  operModeChange(e.target.innerHTML);
};

const numberClick = (e) => {
  const resultWindowsNumber = resultWindow.innerHTML;
  const clickNumber = e.target.innerHTML;
  if (resultWindowsNumber == 0) {
    refreshResultWindow(clickNumber);
    // console.log('현재 숫자가 0이므로 숫자를 그대로 추가합니다.');
  } else if (nowOperMode != null) {
    refreshResultWindow(clickNumber);
  } else {
    const combinedNumber = '' + resultWindowsNumber + clickNumber;
    refreshResultWindow(combinedNumber);
    // console.log('이전 숫자를 이어 줍니다.');
  }
  //   console.log(`넘퍼 패드${inputtedNum}가 눌려졌습니다.`);
};

const equalsClick = (e) => {
  operExec();
  refreshResultWindow(prev);
  nowOperMode = null;
};

for (let i = 0; i < numberButtons.length; i++) {
  const numberButton = numberButtons[i];
  numberButton.addEventListener('click', numberClick);
}

for (let i = 0; i < operatorButtons.length; i++) {
  const operator = operatorButtons[i];
  operator.addEventListener('click', operatorClick);
}

equalsButton.addEventListener('click', equalsClick);
