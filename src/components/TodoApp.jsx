import React, { useState } from "react";
import { connect } from "react-redux";

function TodoApp({ todos, dispatch }) {
  const [text, setText] = useState('');

  function handleAdd() {
    if (text !== '') {
      dispatch({ type: 'ADD_TODO', payload: text });
      setText('');
    }
  }

  function handleDelete(id) {
    dispatch({ type: 'DELETE_TODO', payload: id });
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2> My Todays List</h2>
      <input
        type="text"
        value={text}
        placeholder="Write your task"
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={handleAdd}>Add</button>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.text}
            <button onClick={() => handleDelete(todo.id)}>Remove Todays</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function StateToProps(state) {
  return {
    todos: state.todos
  };
}

export default connect(StateToProps)(TodoApp);



// text

// todos  is array 

// store with connect 

// dispatch to Redux action send 