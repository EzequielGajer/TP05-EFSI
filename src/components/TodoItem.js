import React from 'react';

function TodoItem({ todo, toggleComplete, deleteTodo }) {
  return (
    <div className="todo-item">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleComplete(todo.id)}
      />
      <span className={todo.completed ? 'completed' : ''}>
        {todo.text} (Creado: {new Date(todo.createdAt).toLocaleString()})
        {todo.completedAt && ` - Completado: ${new Date(todo.completedAt).toLocaleString()}`}
      </span>
      <button onClick={() => deleteTodo(todo.id)}>Eliminar</button>
    </div>
  );
}

export default TodoItem;
