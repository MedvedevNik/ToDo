'use strict';
const todoControl = document.querySelector('.todo-control'),
  headerInput = document.querySelector('.header-input'),
  todoList = document.querySelector('.todo-list'),
  todoCompleted = document.querySelector('.todo-completed');

  // localStorage.clear();

let todoData = JSON.parse(localStorage.getItem('todo')) || [];

const addToStorage = () => {
  localStorage.setItem('todo', JSON.stringify(todoData));
};


const moveToStorage = () => {
  let y = JSON.parse(localStorage.getItem("todo"));
}

const render = function() {
  todoList.textContent = '';
  todoCompleted.textContent = '';
  
  moveToStorage();

  todoData.forEach(function(item){
    const li = document.createElement('li');
    li.classList.add('todo-item');

    li.innerHTML = '<span class="text-todo">' + item.value + '</span>' +
      '<div class="todo-buttons">' +
        '<button class="todo-remove"></button>' +
        '<button class="todo-complete"></button>' + 
      '</div>';
    if(item.completed) {
      todoCompleted.append(li);
    } else {
      todoList.append(li);
      
    }
    const todoComplete = li.querySelector('.todo-complete'),
      todoRemove = li.querySelector('.todo-remove');

    todoComplete.addEventListener('click', function(){
      item.completed = !item.completed;
      addToStorage();
      render();
    });
    todoRemove.addEventListener('click', function(){

      const parent = todoRemove.parentNode.parentNode.parentNode;
      const child = todoRemove.parentNode.parentNode;
      // const remove = todoData.splice([].indexOf.call(parent, child), 1);
      parent.removeChild(child);
      let filtered = todoData.filter(
      currentItem => {
        return currentItem !== item;
      }
      );

      todoData = filtered;

      addToStorage();
      render();
      
    });
    headerInput.value = '';
  })
}

todoControl.addEventListener('submit', function(event){
  event.preventDefault();

  addToStorage();
  if (headerInput.value.trim() === '') {
    headerInput.value = '';
  } else {
    const newTodo = {
      value: headerInput.value,
      completed: false
    };
  
    todoData.push(newTodo);

    render();
  }
});

render();


