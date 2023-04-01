import React, { useState } from "react";
import { MDBInput, MDBBtn } from "mdb-react-ui-kit";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import cookie from "react-cookies";
import axios from "axios";
import Joi from "joi";
import {toast} from "react-toastify"

const Register = () => {
  const navigate = useNavigate();
  const login = (e) => {
    e.preventDefault();
    navigate("/login");
  };
  const [inputFields, setInputFields] = useState({
    email: "",
    name: "",
    password: "",
    cPassword: "",
  });
  const [errorsList, setErrorsList] = useState([]);

  const validateUser = () => {
    const schema = Joi.object({
      email: Joi.string().required(),
      name: Joi.string().required(),
      password: Joi.string().required(),
      cPassword: Joi.string().required(),
    });
    return schema.validate(inputFields, { abortEarly: false });
  };

  const onchange = (e) => {
    const { value } = e.target;
    const { name } = e.target;
    setInputFields({ ...inputFields, [name]: value });
  };

  const submitForm = async (event) => {
    event.preventDefault();
 

    const validation = validateUser();
    const error = [];

    if (validation.error) {
      validation.error.details.map((err) => error.push(err.message));
      setErrorsList(error);
      
    } else {
      setErrorsList([]);
      try {
        const result = await axios.post(
          "https://lazy-blue-sockeye-gear.cyclic.app/api/v1/auth/signup",
          inputFields
        );

        if (result.data.message === "success") {
          cookie.save("token", result.data.token);
          toast.success("Regestered Successfully");
          navigate("/login")
          
        } else if (result.data.message === "validation error") {
          result.data.err.map((err) => error.push(err[0].message));
          setErrorsList(error);
          
        } else {
          toast.warning("Password is incorrect");
          
        }
      } catch (exception) {
        toast.warning("Email does not exist");
        
      }
      
    }
  };
  return (
    <>
      <div
        className={
          "w-50 m-auto d-flex justify-content-center align-items-center " +
          styles["custom"]
        }
      >
        <form method="post" className="w-100">
          <h1 className="w-100 text-center text-primary mb-5">Register</h1>
          {errorsList.map((err) => (
            <div
              className="alert bg-alert"
              role="alert"
              data-mdb-color="danger"
            >
              {err}
            </div>
          ))}
          <MDBInput
            className="mb-3"
            label="Enter your email"
            id="email"
            type="text"
            size="lg"
            name="email"
            onChange={onchange}
          />
          <MDBInput
            className="mb-3"
            label="Enter your name"
            id="name"
            type="text"
            size="lg"
            name="name"
            onChange={onchange}
          />

          <MDBInput
            className="mt-3"
            label="Enter your password"
            id="password"
            type="password"
            size="lg"
            name="password"
            onChange={onchange}
          />
          <MDBInput
            className="mt-3"
            label="confirm your password"
            id="cPassword"
            type="password"
            size="lg"
            name="cPassword"
            onChange={onchange}
          />

          <div className="text-center my-3">
            <MDBBtn className="bg-primary" onClick={submitForm}>Register</MDBBtn>
          </div>

          <div className="text-center">
            <div className="d-flex justify-content-center align-items-center">
              <p className="pt-3 me-3">Already have an account ?</p>
              <MDBBtn className="bg-primary" onClick={login}>
                Login
              </MDBBtn>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
