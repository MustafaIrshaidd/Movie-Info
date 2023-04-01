import React from "react";
import { MDBBtn } from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
    const login=()=>{
        navigate("login")
    }
    const register=()=>{
        navigate("register")
    }
  return (
    <>
    <div className="w-75 m-auto text-center mt-5">
      Discover the best movies of all time, as rated by our community of film
      enthusiasts and critics, and never miss a great film again!
    </div>
    <div className="w-100 text-center my-5">
        <MDBBtn className="mx-2 bg-primary" onClick={login}>Login</MDBBtn>
        <MDBBtn className="mx-2 bg-primary" onClick={register}>Register</MDBBtn>
    </div>
    </>
  );
};

export default Home;
