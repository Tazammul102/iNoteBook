import { useState } from "react";
import { Link, useHistory } from "react-router-dom";

const Login = () => {
  const [credentials, setCredentials] = useState({email:"", password:""})
  const {email , password} = credentials;
  let history = useHistory()
    const handleSubmit = async (e) => {
        e.preventDefault()
        let headersList = {
          "Content-Type": "application/json"
         }
         
         const responce = await fetch("http://localhost:5000/api/auth/login", { 
           method: "POST",
           body: JSON.stringify({email , password}),
           headers: headersList
         });
         const data = await responce.json()
         console.log(data);
         setCredentials({email:"", password:""})
         if (data.success) {
           localStorage.setItem('token',data.authtoken)
           history.push("/")
         }
         else{
           alert("Invalid Email And Password")
         }
    }
    const onChange = (e)=>{
      setCredentials({...credentials , [e.target.name]:e.target.value})
    }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            value={credentials.email}
            onChange={onChange}
            name="email"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            value={credentials.password}
            onChange={onChange}
            name="password"
          />
        </div>
        <button type="submit" className="btn btn-dark">
          Login
        </button>
      </form>
      <p className="fs-6 text-center my-5">Don't have any Account. <Link to='/signup'>Signup here!</Link></p>
    </div>
  );
};

export default Login;
