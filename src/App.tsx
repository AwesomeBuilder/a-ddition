import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage.tsx';
import SettingsPage from './pages/SettingsPage.tsx';
import LevelsPage from './pages/LevelsPage.tsx';
import DrawingPage from './pages/DrawingPage.tsx';
import MathQuestionPage from './pages/MathQuestionPage.tsx';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/levels" element={<LevelsPage />} />
        <Route path="/drawing/:pageNumber" element={<DrawingPage />} />
        <Route path="/questions/:difficultyGroup/:difficultyLevel" element={<MathQuestionPage />} />
      </Routes>
    </Router>
  );
}