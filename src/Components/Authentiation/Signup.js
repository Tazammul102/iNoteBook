import {useState} from 'react'
import {Link, useHistory} from 'react-router-dom'

const Signup = () => {
  const [credentials, setCredentials] = useState({name:"", email:"", password:""})
  const {name,email , password} = credentials;
  let history = useHistory()
    const handleSubmit = async (e) => {
        e.preventDefault()
        let headersList = {
          "Content-Type": "application/json"
         }
         
         const responce = await fetch("http://localhost:5000/api/auth/createuser", { 
           method: "POST",
           body: JSON.stringify({name , email , password}),
           headers: headersList
         });
         const data = await responce.json()
        //  console.log(data);
         setCredentials({email:"", password:"" , name:""})
         if (data.success === false) {
           alert("Invalid Email And Password")
        }
        else if (data.emailerror === true) {
           alert(data.error)
        }
        else{
          localStorage.setItem('token',data.authtoken)
          history.push("/")
         }
    }
    const onChange = (e)=>{
      setCredentials({...credentials , [e.target.name]:e.target.value})
    }
    return (
        <div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail2" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail2"
              name="name"
              onChange={onChange}
              value={credentials.name}
              minLength={3}
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="email"
              onChange={onChange}
              value={credentials.email}
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
              name="password"
              onChange={onChange}
              value={credentials.password}
              minLength={6}
            />
          </div>
          <button type="submit" className="btn btn-dark">
            Submit
          </button>
        </form>
        <p className="fs-6 text-center my-5">Already have an Account. <Link to="/login">Login here!</Link></p>
      </div>
    )
}

export default Signup
