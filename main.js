import './style.css'

//{checked , value}
const todos = []

function renderTodos() {
  /**
   * 1. make sure we have our todos list somewhere (e.g. todos variable)
   * 2. we need to have a place to store our todos output, before we render it (i.e. tell the browser to put
   * in some HTML)
   * 3. In the for loop, we are iterating over our todos variable, we
   * capture the specific string at a specific point in the array in the element variable (const element)
   * 4. Then, once we have our specific (i.e. our todo, we can then create the html and store that somewhere)
   * and this is what we're doing in our HTML template.
   * finally, before we render the whole thing, we store the generated HTML template in a new array
   * 5. Finally, we need to "render" the html in the browser, by setting the innerHTML property on our todoList variable.
   */
  const renderedTodos = []
  const todoList = document.getElementById('todoList')


  const outstandingTodos = `<p> You have ${todos.filter(todo => !todo.checked).length} items outstanding.`
  renderedTodos.push(outstandingTodos)
  for (let index = 0; index < todos.length; index++) {
    const todo = todos[index];
    const htmlTemplate = `<div class="todo__entry">
                            <input ${todo.checked ? 'checked' : ''} onclick="handleCheckbox(${index})" type="checkbox" name="Test" id="id-${todo.value}">
                            <p class="${todo.checked ? 'striked' : ''}">${todo.value}</p>
                            <button onclick="removeTodo(${index})">x</button>
                          </div>`
    renderedTodos.push(htmlTemplate)
  }

  todoList.innerHTML = renderedTodos.join('\n')
}

function handleCheckbox (todoPositionIndex) {
  todos[todoPositionIndex].checked = !todos[todoPositionIndex].checked
renderTodos()
}
window.handleCheckbox = handleCheckbox


function handleInputEnter(e) {
  if (e.keyCode == 13) {
    addTodo()
  }
}
window.handleInputEnter = handleInputEnter

function addTodo() {
  const input = document.getElementById('newTodo')
  const todoText = input.value
  if (todoText === '') {
    return
  }
  todos.push({ checked: false, value: todoText })
  input.value = ''
  renderTodos()
}
window.addTodo = addTodo


function removeTodo(todoPositionIndex) {
  todos.splice(todoPositionIndex, 1)
  renderTodos()
}
window.removeTodo = removeTodo

renderTodos()

