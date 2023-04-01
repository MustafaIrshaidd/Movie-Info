import React,{useState} from 'react'
import { MDBBtn, MDBInput } from "mdb-react-ui-kit";
import styles from "./styles.module.css"
import axios from "axios"
import {toast} from "react-toastify"
import { useNavigate, useParams } from "react-router-dom";


const ResetPassword = () => {
  const [inputFields, setInputFields] = useState({
    code: "",
    newPassword: "",
  });
  const { email } = useParams();
  const navigate=useNavigate();

  const onchange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setInputFields({ ...inputFields, [name]: value });
  };
  const submitForm = async (e) => {
    e.preventDefault();
    const result = await axios.patch("https://lazy-blue-sockeye-gear.cyclic.app/api/v1/auth/forgetPassword",{...inputFields,email});
    if(result.data.message === "success"){
        toast.success("Password Resseted Successfully")
        navigate("/login");
    }
    else if (result.data.message === "fail") {
        toast.warning("Please Enter the right code !")
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
          <h1 className="w-100 text-center text-primary mb-5">Reset Password</h1>

          <MDBInput
            className="mb-3"
            label="Enter your code"
            id="code"
            type="text"
            size="lg"
            onChange={onchange}
            name="code"
          />
          <MDBInput
            className="mb-3"
            label="Enter your new password"
            id="email"
            type="password"
            size="lg"
            onChange={onchange}
            name="password"
          />

          <div className="text-center my-3">
            <MDBBtn className="bg-primary" onClick={submitForm}>
              Reset Password
            </MDBBtn>
          </div>
        </form>
      </div>
    </>
  )
}

export default ResetPassword