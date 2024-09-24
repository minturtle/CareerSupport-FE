import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/mainPage/MainPage";
import "tailwindcss/tailwind.css";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route>
          <Route path="/" element={<MainPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
