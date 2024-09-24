import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import "tailwindcss/tailwind.css";
import LoginPage from "./pages/LoginPage";
import { ThemeProvider } from './utils/ThemeProvider';
function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
