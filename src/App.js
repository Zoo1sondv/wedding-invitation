import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import "./App.css";
import { LoadingProvider } from "./context/LoadingContext";
import LoadingPage from "./components/Loading/LoadingPage";
import Home from "./components/Home/Home";
import Overlay from "./components/Overlay/Overlay";

function App() {
  return (
    <LoadingProvider>
      <LoadingPage />
      <Router>
        <Overlay />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </LoadingProvider>
  );
}

export default App;
