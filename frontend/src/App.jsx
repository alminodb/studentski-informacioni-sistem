import Dashboard from "./pages/Dashboard/Dashboard"
import { Route, Routes, BrowserRouter, useNavigate } from "react-router-dom";
import Login from "./pages/Login/Login";
import React, { useContext, useEffect, useState } from "react";
import StudentContext from "./context/student-context";
import { FunctionalContextProvider } from "./context/functional-context";
import StudentQR from "./pages/StudentQR/StudentQR";

function App() {

  return (
    // <React.Fragment>
    //   {studentCtx.isLoggedin === false ? <Login /> : <Dashboard />}
    // </React.Fragment>
      <BrowserRouter>
        <Routes>
          <Route index element={<FunctionalContextProvider><Dashboard /></FunctionalContextProvider>} />
          <Route path="login" element={<Login />} />
          <Route path="qrstuff" element={<StudentQR />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App
