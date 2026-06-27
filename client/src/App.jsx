import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout.jsx';
import TaskDashboard from './pages/TaskDashboard.jsx';

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<TaskDashboard />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
