const h2 = document.querySelector('h2');
const body = document.querySelector('body');

const colorHandler = () => {
  let width = window.innerWidth;
  console.log(width);
  if (width < 500) {
    body.style.backgroundColor = '#393939';
  } else if (width <= 1000 && width >= 500) {
    body.style.backgroundColor = '#ff3399';
  } else if (width > 1000) {
    body.style.backgroundColor = '#39c5bb';
  }
};

window.addEventListener('resize', colorHandler);
