import React,{Fragment,useState} from 'react'
import {Link,Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {login} from '../../action/auth';
import PropTypes from 'prop-types';



 const Login = ({login,isAuthanticated}) => {
   const [formDate,setFormDate] = useState({
     email:'',
     password:''
   });
   const {email,password}=formDate;
   const onChange = e => setFormDate({...formDate,[e.target.name]:e.target.value});
   const onSubmit = e => {
     e.preventDefault();
     login(email,password);
   }
   if(isAuthanticated){
     return <Redirect to="/dashboard" />
   }
  return (
    <Fragment>
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead"><i className="fas fa-user"></i> Sign into Your Account</p>
      <form className="form" onSubmit = {e=>onSubmit(e)}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
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
Login.propTypes ={
  login:PropTypes.func.isRequired,
  isAuthanticated:PropTypes.bool
}
const mapStateToProps = state => ({
  isAuthanticated:state.auth.isAuthanticated
})
export default connect(mapStateToProps,{login})(Login);