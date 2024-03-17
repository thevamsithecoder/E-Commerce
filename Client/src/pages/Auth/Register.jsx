import React, { useState} from 'react'
import Layout from '../../components/Layout/Layout'
import  toast  from "react-hot-toast"
import axios from "axios"; //with the help of it we send the network request
import { useNavigate } from "react-router-dom";
import "../../styles/AuthStyles.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  //form function 
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post("/api/v1/auth/register", {name, email, password, phone, address, answer})
      if(res && res.data.success){ //res.data.success is accessing from backend
        toast.success(res.data && res.data.message)
        navigate("/login")
      } else {
        toast.error(res.data.message)
      }
    }
    catch(error) {
      console.log(error);
      toast.error("Something went wrong")
    }
  }//we are using try catch block because with the help of it te

  return (
      <Layout title="Registration" >
        <div className="form-container" style={{ minHeight: "90vh" }}>
          <form onSubmit={handleSubmit}>
            <h4 className="title">REGISTER FORM</h4>
            <div className="mb-3">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-control"
                id="exampleInputName1"
                placeholder="Enter Your Name"
                required
                autoFocus
              />
            </div>
            <div className="mb-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                id="exampleInputEmail1"
                placeholder="Enter Your Email "
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Enter Your Password"
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="form-control"
                id="exampleInputPhone1"
                placeholder="Enter Your Phone"
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="form-control"
                id="exampleInputAddress1"
                placeholder="Enter Your Address"
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className="form-control"
                id="exampleInputAnswer1"
                placeholder="Your Best Friend's Name"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              REGISTER
            </button>
          </form>
        </div>
      </Layout>
  )
}
export default Register 

//layout wraps everything like header footer are inside the layout
//for each input box we need states because we store the value and send that to database
//page will not refresh in react which is a default behaviour of javascript
//e.preventDefault() //refresh nai hogi
//event->whatever the change occures it will detect at event and it sets inside the name, with the help of onchange we can write in the input box otherwise we can't write anything because the value is fixed which is empty
//         required //if we won't write it will show error
//const [name, setName] = useState("");//initially we don't need any value
//    e.preventDefault() //refresh nai hogi