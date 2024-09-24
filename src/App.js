import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import "tailwindcss/tailwind.css";
import LoginPage from "./pages/LoginPage";
import { ThemeProvider } from './utils/ThemeProvider';
import SignUpPage from "./pages/SignUpPage";
import InterviewTemplatePage from "./pages/InterviewTemplate";
import InterviewChatPage from "./pages/Interview";
function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/interview/template" element={<InterviewTemplatePage />} />
          <Route path="/interview/chat" element={<InterviewChatPage />} />

        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
