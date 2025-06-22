import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './AllTasks.css'; 

function AllTasks({ todos, dispatch }) {
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [newTask, setNewTask] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('oldest'); 

  const handleToggle = (id) => {
    dispatch({ type: 'TOGGLE_COMPLETE', payload: id });
  };

  const handleDelete = (id) => {
    dispatch({ type: 'DELETE_TODO', payload: id });
  };

  const handleEdit = (id, text) => {
    setEditId(id);
    setEditText(text);
  };

  const handleSave = (id) => {
    dispatch({ type: 'EDIT_TODO', payload: { id, text: editText } });
    setEditId();
    setEditText('');
  };

  const handleAddTask = () => {
    if (newTask.trim()) {
      dispatch({ type: 'ADD_TODO', payload: newTask });
      setNewTask('');
      setShowModal(false);
    }
  };

  //  search 
  const filteredTodos = todos.filter(todo =>
    todo.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedTodos = filteredTodos.slice().sort((a, b) => {
    if (sortOrder === 'oldest') {
      return a.id - b.id; 
    } else {
      return b.id - a.id; 
    }
  });

  return (
    <section>
      <div className="task-container">
        <h1>All Tasks</h1>

        <div className="top-bar">
          <Link to="/" className="back-link">← Back</Link>
          <button className="add-btn" onClick={() => setShowModal(true)}>➕ Add Todays</button>
        </div>

        {/* Search Box */}
        <div className="search-box" style={{ margin: '20px 0' }}>
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ padding: '8px', width: '100%', maxWidth: '400px' }}
          />
        </div>

        {/* Sort  */}
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="sort-select" style={{ marginRight: '10px' }}>
            Sort Tasks:
          </label>
          <select
            id="sort-select"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            style={{ padding: '6px' }}
          >
            <option value="oldest">Oldest First</option>
            <option value="newest">Newest First</option>
          </select>
        </div>

        {/* Task List */}
        <ul className="task-list">
          {sortedTodos.length > 0 ? (
            sortedTodos.map((todo) => (
              <li key={todo.id} className="task-item">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggle(todo.id)}
                />

                {editId === todo.id ? (
                  <>
                    <input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="edit-input"
                    />
                    <button onClick={() => handleSave(todo.id)} className="save-btn">Save</button>
                  </>
                ) : (
                  <>
                    <span className={`task-text ${todo.completed ? 'completed' : ''}`}>
                      {todo.text}
                    </span>
                    <button onClick={() => handleEdit(todo.id, todo.text)} className="edit-btn">Edit</button>
                  </>
                )}

                <button onClick={() => handleDelete(todo.id)} className="delete-btn">Delete</button>
              </li>
            ))
          ) : (
            <p>No tasks found for "{searchTerm}"</p>
          )}
        </ul>

        {/* Modal Adding Task */}
        {showModal && (
          <div className="modal-backdrop">
            <div className="modal">
              <h3>Add New Task</h3>
              <input
                type="text"
                placeholder="Enter your task"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
              />
              <div className="modal-buttons">
                <button onClick={handleAddTask}>Add</button>
                <button className="cancel" onClick={() => setShowModal(false)}>Cancel</button>
              </div>
            </div>
          </div>
        )}

        {/* Display sort */}
        <div className='sort'>
          <p><strong>Task Name</strong></p>
          <p>
            Sorted by created time (
            {sortOrder === 'oldest' ? 'oldest first' : 'newest first'}
            )
          </p>
        </div>
      </div>
    </section>
  );
}

const mapStateToProps = (state) => ({
  todos: state.todos,
});

export default connect(mapStateToProps)(AllTasks);
