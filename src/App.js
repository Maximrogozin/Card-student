// import Form from "./components/form";
// import LoginForm from "./components/forms";
// import Main from "./components/main";
import React from "react";
import { Route, Routes } from "react-router-dom";
import CreateForm from "./components/createForm";
import Main from "./components/main";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" exact element={<Main />} />
        <Route path="/createForm" element={<CreateForm />} />
      </Routes>
    </div>
  );
}

export default App;
