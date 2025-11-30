import { useState } from "react";
import ExcelUpload from "./components/ExcelUpload";
import LoginPage from "./components/Loginpage";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Call this from LoginPage when login succeeds
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  return (
    <div className="outer-center">
      <div className="calculator-container">
        {isLoggedIn ? (
          <ExcelUpload />
        ) : (
          <LoginPage onLoginSuccess={handleLoginSuccess} />
        )}
      </div>
    </div>
  );
}

export default App;
