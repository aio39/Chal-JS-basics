import './styles.css';
const colors = ['#1abc9c', '#3498db', '#9b59b6', '#f39c12', '#e74c3c'];

const h2 = document.querySelector('h2');

const superEventHandler = {
  rightClick: function () {
    h2.innerText = '우클릭';
    h2.style.color = colors[0];
  },
  mouseEnter: function () {
    h2.innerText = '마우스가 있습니다.';
    h2.style.color = colors[1];
  },
  mouseClick: function () {
    h2.innerText = '마우스로 클릭 했습니다.';
    h2.style.color = colors[2];
  },
  mouseLeave: function () {
    h2.innerText = '마우스가 떠났습니다.';
    h2.style.color = colors[3];
  },
  windowResized: function () {
    h2.innerText = '윈도우 창이 조절 되었습니다.';
    h2.style.color = colors[4];
  },
};

h2.addEventListener('mouseenter', superEventHandler.mouseEnter);
h2.addEventListener('mouseleave', superEventHandler.mouseLeave);
h2.addEventListener('click', superEventHandler.mouseClick);
window.addEventListener('contextmenu', superEventHandler.rightClick);
window.addEventListener('resize', superEventHandler.windowResized);
