import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from './views/Login/Login';
import Dashboard from './views/Dashboard/Dashboard';
import PageNotFound from './views/PageNotFound/PageNotFound';
import Signup from './views/Signup/Signup';

function App() {
  const token = localStorage.getItem("token");

  const publicRouter = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/",
      element: <Dashboard />,
    },
    {
      path: "/*",
      element: <PageNotFound />,
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={publicRouter} />
    </div>
  );
}

export default App;
