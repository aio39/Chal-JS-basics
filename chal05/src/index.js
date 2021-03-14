const inputBar = document.getElementById('input');
const pendingTodoUl = document.getElementById('pendingTodo');
const ls = globalThis.localStorage;

let pendingTodoList = [];
let finishedTodoList = [];

const pushToLocal = (listName, listArr) => {
  ls.setItem(listName, JSON.stringify(listArr));
};

const pushPendingTodo = (text, id = Date.now()) => {
  const todo = { id: id, text: text };
  pendingTodoList.push(todo);
};

const makePendingTodo = (text, id) => {
  const li = document.createElement('li');
  const cancelButton = document.createElement('button');
  const finishButton = document.createElement('button');

  cancelButton.innerText = 'X';
  finishButton.innerText = 'V';

  li.innerText = text;
  li.setAttribute('data-id', id);
  li.appendChild(cancelButton);
  li.appendChild(finishButton);
  pendingTodoUl.appendChild(li);
};

const refresh = () => {
  pendingTodoUl.innerHTML = '';
  pendingTodoList.forEach((todoObj) => {
    console.log(todoObj);
    makePendingTodo(todoObj.text, todoObj.id);
  });

  pushToLocal('pending', pendingTodoList);
};

const getText = (e) => {
  const inputText = e.target.value;
  e.target.value = '';
  return inputText;
};

const handleInput = (e) => {
  if (e.code == 'Enter') {
    const inputText = getText(e);
    pushPendingTodo(inputText);

    refresh();
  }
};

inputBar.addEventListener('keypress', handleInput);

const startFunc = () => {
  const pending = ls.getItem('pending');
  pendingTodoList = JSON.parse(pending);
  const finished = ls.getItem('finished');
  finishedTodoList = JSON.parse(finished);
  refresh();
};
startFunc();
