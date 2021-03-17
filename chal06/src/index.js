const range = document.getElementById('range');
const max = document.getElementById('number');
const button = document.querySelector('button');
const result = document.getElementById('result');
const result2 = document.getElementById('result2');

const getRangeValue = (e) => {
  console.log(e.target.value);
  max.innerText = e.target.value;
};

range.addEventListener('change', getRangeValue);

const getRandom = () => {
  const random = Math.round(Math.random() * parseInt(max.innerText));
  console.log(random);
  return random;
};

const startGame = () => {
  let targetNum = getRandom();
  let comNum = getRandom();
  let yourNum = document.getElementById('yournum').value;
  result.innerText = `당신의 추측은:${yourNum} 로봇의 추측은:${comNum} 결과는:${targetNum}`;
  if (Math.abs(targetNum - comNum) > Math.abs(targetNum - yourNum)) {
    console.log('이겼습니다.');
    result2.innerText = '당신이 이겼습니다.';
  } else if (Math.abs(targetNum - comNum) == Math.abs(targetNum - yourNum)) {
    console.log('비겼습니다.');
    result2.innerText = '비겼습니다.';
  } else {
    console.log('졌습니다.');
    result2.innerText = '당신이 졌습니다.';
  }
};

button.addEventListener('click', startGame);
