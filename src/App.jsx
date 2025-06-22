import { Routes, Route } from 'react-router-dom';
import TodoApp from './components/TodoApp';
import AllTasks from './components/AllTasks';
import People from './components/People';


function App() {
  return (
    <Routes>
      <Route path="/" element={<TodoApp />} />
      <Route path="/all" element={<AllTasks />} />
      <Route path="/people" element={<People />} />

    </Routes>
  );
}

export default App;
