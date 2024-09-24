import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import "tailwindcss/tailwind.css";
import LoginPage from "./pages/LoginPage";
import { ThemeProvider } from './utils/ThemeProvider';
import SignUpPage from "./pages/SignUpPage";
function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
