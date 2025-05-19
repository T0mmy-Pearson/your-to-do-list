import ToDoInput from "./components/ToDoInput";
import ToDoList from "./components/ToDoList";
import { useState, useEffect } from "react";

function App() {

  const [todos, setTodos] = useState(["Your first task..."]);
  const [ todoValue, setTodoValue ] = useState("");

  function persistData(newList) {
    localStorage.setItem("todos", JSON.stringify({ todos: newList }))
  }

  function handleAddTodos(newTodo) {
    const newTodosList = [...todos, newTodo];
    persistData(newTodosList);
    setTodos(newTodosList);
  }

  function handleDeleteTodos(index) {
    const newTodosList = todos.filter((todo, toDoIndex) => {
      return toDoIndex !== index
    });
    persistData(newTodosList);
    setTodos(newTodosList);
  }

  function handleEditTodos(index) {
    const valueToEdit = todos[index]
    setTodoValue(valueToEdit)
    handleDeleteTodos(index);
  }

useEffect(() => {
  if(!localStorage){
    return
  }
  let localTodos = localStorage.getItem("todos");
  if(!localTodos){
    return
  }

  localTodos = JSON.parse(localTodos).todos
  setTodos(localTodos)
}, []);

  return (
    <>
     <ToDoInput todoValue={todoValue} setTodoValue={setTodoValue } handleAddTodos={handleAddTodos} />
     <ToDoList handleEditTodos={handleEditTodos} handleDeleteTodos={handleDeleteTodos} todos={todos}/> 
    </>
  )
}

export default App
