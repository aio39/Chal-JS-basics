const inputBar = document.getElementById('input');
const pendingTodoUl = document.getElementById('pendingTodo');
const finishedTodoUl = document.getElementById('finishedTodo');
const ls = globalThis.localStorage;

let finishedTodoList = [];
let pendingTodoList = [];

const pushToLocal = (listName, listArr) => {
  ls.setItem(listName, JSON.stringify(listArr));
};

const handleTodoStatus = (e) => {
  console.log(e.target.parentElement);
  const li = e.target.parentElement;
  const text = li.getElementsByTagName('span')[0].innerText;
  const id = li.getAttribute('data-id');
  const nowTodoType = li.className;

  if (nowTodoType == 'pending') {
    console.log(nowTodoType);
    pushFinishedTodo(text, id);
    pendingTodoList = deleteTodo(pendingTodoList, id);
  }
  if (nowTodoType == 'finish') {
    console.log(nowTodoType);
    pushPendingTodo(text, id);
    finishedTodoList = deleteTodo(finishedTodoList, id);
  }
  refresh();
};

const deleteTodo = (todoList, id) => {
  return (todoList = todoList.filter((todo) => {
    console.log(todo.id, id);
    if (todo.id != id) {
      return true;
    } else {
      return false;
    }
  }));
};

const pushFinishedTodo = (text, id = Date.now()) => {
  const todo = { id: id, text: text };
  finishedTodoList.push(todo);
};
const pushPendingTodo = (text, id = Date.now()) => {
  const todo = { id: id, text: text };
  pendingTodoList.push(todo);
};

const makeTodoLi = (text, id, todoType = 'pending') => {
  const li = document.createElement('li');

  const textSpan = document.createElement('span');
  textSpan.innerText = text;
  const cancelButton = document.createElement('button');
  const changeButton = document.createElement('button');
  cancelButton.innerText = 'X';
  if (todoType == 'pending') {
    changeButton.innerText = 'V';
  } else {
    changeButton.innerText = 'R';
  }
  changeButton.addEventListener('click', handleTodoStatus);

  li.setAttribute('data-id', id);
  li.classList.add(todoType);
  li.appendChild(textSpan);
  li.appendChild(cancelButton);
  li.appendChild(changeButton);
  if (todoType == 'pending') {
    pendingTodoUl.appendChild(li);
  } else {
    finishedTodoUl.appendChild(li);
  }
};

const refresh = () => {
  // 자바스크립트 메모리 상의 투두리스트에 맞게 HTML을 갱신 합니다.
  pendingTodoUl.innerHTML = '';
  pendingTodoList.forEach((todoObj) => {
    makeTodoLi(todoObj.text, todoObj.id, 'pending');
  });
  finishedTodoUl.innerHTML = '';
  finishedTodoList.forEach((todoObj) => {
    makeTodoLi(todoObj.text, todoObj.id, 'finish');
  });

  // 메모리 상의 투두리스트를 로컬 스토리지에 넣습니다.
  pushToLocal('pending', pendingTodoList);
  pushToLocal('finish', finishedTodoList);
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
  if (pending != null) pendingTodoList = [...JSON.parse(pending)];
  const finished = ls.getItem('finish');
  if (finished != null) finishedTodoList = [...JSON.parse(finished)];
  refresh();
};
startFunc();
