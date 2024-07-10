import React, { useState } from 'react';
import './TodoApp.css';

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [tarea, setTarea] = useState('');

  const inputsValidos = () => tarea.length > 0;

  const agregarTODO = () => {
    if (!inputsValidos()) {
      alert('Ingrese la tarea a realizar');
      return;
    }

    const nuevaTarea = {
      tarea,
      timestamp: new Date().toLocaleString(),
      completado: false,
      timestampTachado: null
    };

    setTodos([...todos, nuevaTarea]);
    setTarea('');
  };

  const eliminarTODO = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  const toggleCompletado = (index) => {
    const nuevosTodos = todos.map((todo, i) => {
      if (i === index) {
        return {
          ...todo,
          completado: !todo.completado,
          timestampTachado: todo.completado ? null : new Date().toLocaleString()
        };
      }
      return todo;
    });
    setTodos(nuevosTodos);
  };

  const tareamasrapida = () => {
    if (todos.length === 0) {
      alert('No hay tareas ingresadas');
      return;
    }

    const tareasCompletadas = todos.filter(todo => todo.completado);

    if (tareasCompletadas.length === 0) {
      alert('No hay tareas completadas');
      return;
    }

    let tareaMasRapida = tareasCompletadas[0];
    tareasCompletadas.forEach(todo => {
      if (new Date(todo.timestamp) < new Date(tareaMasRapida.timestampTachado)) {
        tareaMasRapida = todo;
      }
    });

    alert(`La tarea más rápida fue: ${tareaMasRapida.tarea}`);
  };

  return (
    <div className="App">
      <h1>TO DO LIST</h1>
      <input
        type="text"
        value={tarea}
        onChange={(e) => setTarea(e.target.value)}
        required
      />
      <button onClick={agregarTODO}>Agregar TODO</button>
      <ul id="todo-list">
        {todos.map((todo, index) => (
          <li key={index}>
            <span
              onClick={() => toggleCompletado(index)}
              className={todo.completado ? 'completed' : ''}
            >
              {todo.tarea}
            </span>
            <button onClick={() => eliminarTODO(index)}>Eliminar</button>
          </li>
        ))}
      </ul>
      <button onClick={tareamasrapida}>Tarea más rápida</button>
    </div>
  );
}

export default TodoApp;
