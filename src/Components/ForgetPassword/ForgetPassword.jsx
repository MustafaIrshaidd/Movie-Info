import React,{useState} from "react";
import { MDBBtn, MDBInput} from "mdb-react-ui-kit";
import styles from "./styles.module.css"
import axios from "axios"
import {toast} from "react-toastify"
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const [inputFields, setInputFields] = useState(null);

  const onchange = (e) => {
    const { value } = e.target;
    setInputFields(value);
  };

  const submitForm= async (e)=>{
    e.preventDefault();
    console.log(inputFields)
    if(!inputFields || inputFields.length<8){
      toast.warning("Please enter your email !")
      return ;
    }
    const result =await axios.patch("https://lazy-blue-sockeye-gear.cyclic.app/api/v1/auth/sendCode",{email:inputFields})
    if(result.data.message === "success"){
      toast.success("Password Resetted Successfully ! Please Checkout your email")
      navigate(`/reset-password/${inputFields}`)
    }
    else {
      toast.warning(`${result.data.message}`)
    }
  }

  return (
    <>
      <div
        className={
          "w-50 m-auto d-flex justify-content-center align-items-center " +
          styles["custom"]
        }
      >
        <form method="POST" className="w-100">
          <h1 className="w-100 text-center text-primary mb-5">Forget Password</h1>

          <input className="form-control" placeholder="Enter your email" type="text" name="email" value={inputFields} onChange={onchange}  />

          <div className="text-center my-3">
            <MDBBtn className="bg-primary" type="submit" onClick={submitForm}>
              Send Code
            </MDBBtn>
          </div>
        </form>
      </div>
    </>
  );
};

export default ForgetPassword;
