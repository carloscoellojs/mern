import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import Blog from "./pages/Blog/Blog";
import common from "./lib/common";
import { store, persistor } from "./reducers/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";
import { PageNotFound } from "./pages/PageNotFound/PageNotFound";
import HomePage from "./pages/HomePage/HomePage";

if (localStorage.getItem("token")) {
  common.authenticateWithHeaders(localStorage.getItem("token"));
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigation />,
    children: [
      {
        path: "/",
        element: <HomePage />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/register",
        element: <Register />
      },
      {
        path: "/dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        )
      },
      {
        path: "/blog",
        element: (
          <ProtectedRoute>
            <Blog />
          </ProtectedRoute>
        )
      },
    ],
  },
  {
    path: "/*",
    element: <PageNotFound />
  }
]);

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  );
}

export default App;
