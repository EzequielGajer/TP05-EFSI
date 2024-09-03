import React, { useState } from 'react';
import TodoList from './components/TodoList';
import './index.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [fastestTask, setFastestTask] = useState(null);

  const addTodo = () => {
    if (input.trim() === '') return;

    const newTodo = {
      id: Date.now(),
      text: input,
      completed: false,
      createdAt: Date.now(),
      completedAt: null,
    };
    setTodos([...todos, newTodo]);
    setInput('');
  };

  const toggleComplete = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
        todo.completedAt = todo.completed ? Date.now() : null;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const findFastestTask = () => {
    const completedTodos = todos.filter((todo) => todo.completed);
    if (completedTodos.length === 0) {
      setFastestTask(null);
      return;
    }

    let fastest = completedTodos[0];
    completedTodos.forEach((todo) => {
      const completionTime = todo.completedAt - todo.createdAt;
      const fastestTime = fastest.completedAt - fastest.createdAt;
      if (completionTime < fastestTime) {
        fastest = todo;
      }
    });
    setFastestTask(fastest);
  };

  return (
    <div className="container">
      <h1>TODO List</h1>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={addTodo}>Agregar</button>
      </div>
      <TodoList todos={todos} toggleComplete={toggleComplete} deleteTodo={deleteTodo} />
      <button className="show-fastest" onClick={findFastestTask}>
        Mostrar Tarea Más Rápida
      </button>
      {fastestTask && (
        <div className="fastest-task">
          <h2>Tarea más rápida en completarse</h2>
          <p>{fastestTask.text} (Tiempo: {(fastestTask.completedAt - fastestTask.createdAt) / 1000} segundos)</p>
        </div>
      )}
    </div>
  );
}

export default App;
