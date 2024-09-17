// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import routes from "./routes";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

function App() {
  return (
    <Router>
      <Routes>
        {routes.map(({ path, element, routeType, allowedRoles }, index) => (
          <Route
            key={index}
            path={path}
            element={
              routeType === "private" ? (
                <PrivateRoute allowedRoles={allowedRoles}>
                  {element}
                </PrivateRoute>
              ) : (
                <PublicRoute>{element}</PublicRoute>
              )
            }
          />
        ))}
      </Routes>
    </Router>
  );
}

export default App;
