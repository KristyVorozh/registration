import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Outlet,
  Routes,
} from "react-router-dom";
import Auth from "./Component/Auth";
import Posts from "./Component/Posts";

function App() {

  const PrivateRoute = () => {
    const auth = localStorage.getItem('accessToken'); 
    return auth ? <Outlet /> : <Navigate to="/" />;
  };

  return (
    <Router>
        <Routes>
          <Route exact path='/' element={<Auth/>}/>
          <Route exact path='/' element={<PrivateRoute/>}>
            <Route exact path='/posts' element={<Posts/>}/>
          </Route>
        </Routes>
    </Router>
  );
}

export default App;
