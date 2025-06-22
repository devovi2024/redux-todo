const initialState = {
  todos: [],
};

const handlers = {
  ADD_TODO: (state, action) => ({
    ...state,
    todos: [
      ...state.todos,
      {
        id: Date.now(),
        text: action.payload,
        completed: false,
      },
    ],
  }),

  DELETE_TODO: (state, action) => ({
    ...state,
    todos: state.todos.filter((todo) => todo.id !== action.payload),
  }),

  TOGGLE_COMPLETE: (state, action) => ({
    ...state,
    todos: state.todos.map((todo) =>
      todo.id === action.payload
        ? { ...todo, completed: !todo.completed }
        : todo
    ),
  }),

  EDIT_TODO: (state, action) => ({
    ...state,
    todos: state.todos.map((todo) =>
      todo.id === action.payload.id
        ? { ...todo, text: action.payload.text }
        : todo
    ),
  }),
};

const todoReducer = (state = initialState, action) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

export default todoReducer;
