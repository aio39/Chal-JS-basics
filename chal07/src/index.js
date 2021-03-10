const resultWindow = document.querySelector('.result');
const subResultWindow = document.querySelector('.subResult');
const numberButtons = document.querySelectorAll('.num');
const operatorButtons = document.querySelectorAll('.oper');
const equalsButton = document.querySelector('.equals');
const cancelButtons = document.querySelector('.cancel');

let prev = 0;
let prev2 = 0;
let next = 0;
let nowOperMode;
let noeOperSign;

let isPrevClickEquals = false;
let isPrevClickOper = false;
let isAbleCombineNum = true;

console.log(nowOperMode == undefined);
console.log(nowOperMode == null);
console.log(null == undefined);

const refreshSubResultWindow = (next) => {
  subResultWindow.innerHTML = `${prev} ${noeOperSign} ${next} `;
  console.log('서브 결과창이 갱신되었습니다.');
};

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

const operExec = (num1, num2) => {
  let result;
  console.log(num1, num2);
  switch (nowOperMode) {
    case 'plus':
      result = parseFloat(num1) + parseFloat(num2);
      break;
    case 'minus':
      result = parseFloat(num1) - parseFloat(num2);
      break;
    case 'multi':
      result = parseFloat(num1) * parseFloat(num2);
      break;
    case 'divide':
      result = parseFloat(num1) / parseFloat(num2);
      break;
    default:
      console.log('eoprExec에서 오류 발생,');
      break;
  }
  refreshSubResultWindow(num2);
  prev2 = prev;
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
  noeOperSign = e.target.innerHTML;
  refreshSubResultWindow('');
  resultWindowNumToPrev();
  operModeChange(e.target.innerHTML);
  isPrevClickEquals = false;
  isPrevClickOper = true;
  isAbleCombineNum = false;
};

const numberClick = (e) => {
  const resultWindowsNumber = resultWindow.innerHTML;
  const clickNumber = e.target.innerHTML;
  if (resultWindowsNumber == 0) {
    refreshResultWindow(clickNumber);
    // console.log('현재 숫자가 0이므로 숫자를 그대로 추가합니다.');
  } else if (isAbleCombineNum == false) {
    refreshResultWindow(clickNumber);
    isAbleCombineNum = true;
  } else {
    const combinedNumber = '' + resultWindowsNumber + clickNumber;
    refreshResultWindow(combinedNumber);
    // console.log('이전 숫자를 이어 줍니다.');
  }
  //   console.log(`넘퍼 패드${inputtedNum}가 눌려졌습니다.`);
  isPrevClickEquals = false;
  isPrevClickOper = false;
};

const equalsClick = (e) => {
  if (isPrevClickEquals) {
    let temp = next;
    next = resultWindow.innerHTML;
    operExec(next, temp);
    next = temp;
  } else {
    temp = next;
    next = resultWindow.innerHTML;
    operExec(prev, next);
  }

  refreshResultWindow(prev);
  isPrevClickEquals = true;
  isPrevClickOper = false;
  isAbleCombineNum = false;
  console.log(prev2, prev, next, 'prev2, prev, next입니다.');
};

const cancelClick = (e) => {
  nowOperMode = null;
  next = 0;
  prev = 0;
  refreshResultWindow(0);
  isPrevClickEquals = false;
  isPrevClickOper = false;
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

cancelButtons.addEventListener('click', cancelClick);
