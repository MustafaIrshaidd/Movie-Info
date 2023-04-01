import React,{useState} from "react";
import { MDBBtn, MDBInput, MDBNavbarLink } from "mdb-react-ui-kit";
import styles from "./styles.module.css";
import { Link,useNavigate  } from "react-router-dom";
import Joi from "joi";
import cookie from "react-cookies"
import axios from "axios";

const Login = ({logUser}) => {
    const navigate = useNavigate()

    const [inputFields,setInputFields] = useState({
        email:'',
        password:''
    })
    const [errorsList, setErrorsList] = useState([]);

    const register = (e)=>{
        e.preventDefault()
        navigate("/register")
    }

    const validateUser = () => {
      const schema = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required(),
      });
      return schema.validate(inputFields, { abortEarly: false });
    }

    const onchange = (e)=>{
        const {value} = e.target
        const {name} = e.target
        setInputFields({...inputFields,[name]:value})
    }

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
            "https://lazy-blue-sockeye-gear.cyclic.app/api/v1/auth/signin",
            inputFields
          );
          if (result.data.message === "success") {
            const expires = new Date();
            const futureDay = expires.getDate()+1;
            expires.setDate(futureDay)
            cookie.save("token",result.data.token,{expires})
            logUser(result.data.token)
            navigate("/movies");
          } else if (result.data.message === "validation error") {
            result.data.err.map((err) => error.push(err[0].message));
            setErrorsList(error);
            
          } else {
            console.log(result)
            console.log("password incorrect");
            
          } 
        } catch (exception) {
          console.log("email does not exist");
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
          <h1 className="w-100 text-center text-primary mb-5">Login</h1>

          
          {errorsList.map((err) => (
            <div className="alert bg-alert" role="alert" data-mdb-color="danger">
              {err}
            </div>
          ))}

          <MDBInput
            className="mb-3"
            label="Enter your email"
            id="email"
            type="text"
            size="lg"
            onChange={onchange}
            name="email"
          />

          <MDBInput
            className="mt-3"
            label="Enter your password"
            id="password"
            type="password"
            size="lg"
            onChange={onchange}
            name="password"
          />

          <div className="text-center my-3">
            <MDBBtn className="bg-primary" onClick={submitForm}>
              Login
            </MDBBtn>
          </div>

          <div className="text-center">
            <Link to="/forget-password" className="my-4 d-block">
              Forgot password ?
            </Link>
            <div className="d-flex justify-content-center align-items-center">
              <p className="pt-3 me-3">You don't have an account ?</p>
              <MDBBtn className="bg-primary" onClick={register}>
                Register
              </MDBBtn>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
