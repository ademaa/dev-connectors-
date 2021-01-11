import React,{Fragment,useState} from 'react'
import {Link} from 'react-router-dom';
 const Login = () => {
   const [formDate,setFormDate] = useState({
     email:'',
     password:''
   });
   const {email,password}=formDate;
   const onChange = e => setFormDate({...formDate,[e.target.name]:e.target.value});
   const onSubmit = e => {
     e.preventDefault();
     console.log("success");
   }
  return (
    <Fragment>
      <div className="alert alert-danger">
        Invalid credentials
      </div>
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead"><i className="fas fa-user"></i> Sign into Your Account</p>
      <form className="form" onSubmit = {e=>onSubmit(e)}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            required
            onChange={e=>onChange(e)}
            value={email}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={e=>onChange(e)}
            value={password}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
    </Fragment>
  )
}
export default Login;