import { Routes, Route } from 'react-router-dom';
import TodoApp from './components/TodoApp';
import AllTasks from './components/AllTasks';


function App() {
  return (
    <Routes>
      <Route path="/" element={<TodoApp />} />
      <Route path="/all" element={<AllTasks />} />
    </Routes>
  );
}

export default App;
