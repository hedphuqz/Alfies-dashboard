import './style.css'

//{checked , value}
let todos = []

function getTodosFromLocalStorage() {
  /**
   * This fetches any previously stored todo items from the browser
   * local storage.
   * This allows us to persist todo items between browser refreshes,
   * if the list is not stored somewhere, then the todos variable will
   * simply be re-initialized empty on every browser refresh
   */
  const storedTodos = window.localStorage.getItem('TODOS_AP')
  if (storedTodos === null) {
    /**
     * If we haven't stored anything in localStorage yet, then
     * when we try to retrieve something that doesn't exist it will return null
     * null is a datatype that essentially means, there is no value present there YET.
     * It explicitely references the absence of an item, specifically an object. 
     * 
     * More on this subtle difference here --> https://www.geeksforgeeks.org/undefined-vs-null-in-javascript/
     * 
     * By stopping the function here, we prevent our todos variable being assigned a value of null
     * if it's null, then it's no longer an array and we can't put data in or do .push() .splice() etc...
     */
    return
  }

  // more on JSON.parse() here:
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse
  todos = JSON.parse(storedTodos)
}

function setTodosToLocalStorage() {
  /**
   * parses our array of objects to a string, and sets it in the local storage
   * under the 'TODOS_AP' key, where we can retrieve it for later.
   * 
   * more on JSON.stringify() here:
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
   * 
   * We need to stringify our JSON array as local storage does not 
   * accept JSON, only string data types
   */

  window.localStorage.setItem('TODOS_AP', JSON.stringify(todos))
}

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

function handleCheckbox(todoPositionIndex) {
  todos[todoPositionIndex].checked = !todos[todoPositionIndex].checked
  setTodosToLocalStorage()

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
  setTodosToLocalStorage()
  input.value = ''

  renderTodos()
}
window.addTodo = addTodo


function removeTodo(todoPositionIndex) {
  todos.splice(todoPositionIndex, 1)
  setTodosToLocalStorage()
  
  renderTodos()
}
window.removeTodo = removeTodo

getTodosFromLocalStorage()
renderTodos()

