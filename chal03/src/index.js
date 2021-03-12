const myStorage = window.localStorage;

const select = document.querySelector('select');

let selectedValue = myStorage.getItem('con');

const getSelect = (e) => {
  let selectedValue = e.target.value;
  myStorage.setItem('con', selectedValue);
};

if (selectedValue) {
  (function set() {
    const option = document.querySelector(`option[value="${selectedValue}"]`);
    option.selected = true;
  })();
}

select.addEventListener('change', getSelect);
