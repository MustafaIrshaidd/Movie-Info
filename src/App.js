import "./App.css";
import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Home from "./Components/Home/Home";
import Loader from "./Loader/Loader";
import Movies from "./Components/Movies/Movies";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import PageNotFound from "./Components/PageNotFound/PageNotFound";
import cookies from "react-cookies";
import axios from "axios";
import {ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import ForgetPassword from "./Components/ForgetPassword/ForgetPassword";
import ResetPassword from "./Components/ResetPassword/ResetPassword";
import MovieCard from "./Components/MovieCard/MovieCard";

function App() {
  const [user, setUser] = useState(cookies.load("token"));
  const [loader, setLoader] = useState(true);
  const [users, setUsers] = useState([]);
  const [movies, setMovies] = useState([]);
  const getMovies = async () => {
    const result = await axios.get(
      "https://api.themoviedb.org/3/movie/popular?api_key=55565e4437f792216e1c56bb979206d5&language=en-US&page=1"
    );
    setMovies(result.data);
  };

  const getUsers = async () => {
    const result = await axios.get(
      "https://lazy-blue-sockeye-gear.cyclic.app/api/v1/auth/getAllUsers"
    );
    setTimeout(() => {
      setLoader(false);
      setUsers(result.data);
    }, 1000);
  };

  useEffect(() => {
    getUsers();
    getMovies();
  }, []);
  return (
    <>
      <Navbar user={user} setUser={setUser} />
      <ToastContainer
        position="top-center"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {loader ? (
        <Loader />
      ) : (
        <Routes>
          {user ? (
            <>
              
              <Route path="movies" element={<Movies movies={movies} />}></Route>
              <Route path="movie-card/:id" element={<MovieCard movies={movies} />}></Route>
              
            </>
          ) : (
            <>
              <Route path="login" element={<Login logUser={setUser} />}></Route>
              <Route path="/" element={<Home />}></Route>
              <Route path="register" element={<Register />}></Route>
              <Route path="forget-password" element={<ForgetPassword />}></Route>
              <Route path="reset-password/:email" element={<ResetPassword />}></Route>
              <Route path="*" element={<PageNotFound />}></Route>
            </>
          )}
        </Routes>
      )}
    </>
  );
}

export default App;
