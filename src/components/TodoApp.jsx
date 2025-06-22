import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

function TodoApp({ todos, dispatch }) {
  const [text, setText] = useState('');

  const handleAdd = () => {
    if (text.trim() !== '') {
      dispatch({ type: 'ADD_TODO', payload: text });
      setText('');
    }
  };

  const handleDelete = (id) => {
    dispatch({ type: 'DELETE_TODO', payload: id });
  };

  const handleToggle = (id) => {
    dispatch({ type: 'TOGGLE_COMPLETE', payload: id });
  };

  const incompleteTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);

  return (
    <div className="container">
      <h1>Todays My Task</h1>

      <div style={{ marginBottom: '10px' }}>
        <Link to="/people" style={{ fontSize: '18px', color: '#007bff', textDecoration: 'underline' }}>
          People
        </Link>
      </div>


      <div className="input-section">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter todays task"
        />
        <button onClick={handleAdd}>Add</button>
      </div>

      <section className="todo-section">
        <h2>Pending Tasks</h2>
        <ul>
          {incompleteTodos.map((todo) => (
            <li key={todo.id} className="fade">
              <label>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggle(todo.id)}
                />
                <span>{todo.text}</span>
              </label>
              <button onClick={() => handleDelete(todo.id)}>Remove</button>
            </li>
          ))}
          {incompleteTodos.length === 0 && <p>No pending tasks</p>}
        </ul>
      </section>

      <section className="todo-section completed">
        <h2>Completed Tasks</h2>
        <ul>
          {completedTodos.map((todo) => (
            <li key={todo.id} className="fade completed-item">
              <label>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggle(todo.id)}
                />
                <span>{todo.text}</span>
              </label>
              <button onClick={() => handleDelete(todo.id)}>Remove</button>
            </li>
          ))}
          {completedTodos.length === 0 && <p>No completed tasks</p>}
        </ul>
      </section>

      <section>
        <div className="see-all-link-container">
        <Link to="/all" className="see-all-link">
            👉 See All Tasks
        </Link>
        </div>
      </section>
    </div>
  );
}

const mapStateToProps = (state) => ({
  todos: state.todos,
});

export default connect(mapStateToProps)(TodoApp);
