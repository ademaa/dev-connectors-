import React,{Fragment,useState} from 'react'
import {Link,Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {setAlert} from '../../action/alert';
import {register} from '../../action/auth';
import PropTypes from 'prop-types'


 const Register = ({setAlert,register,isAuthanticated}) => {
     const [formDate, setFormDate] = useState({
         name:'',
         email:'',
         password:'',
         password2:''
     });
     const {name,email,password,password2} = formDate;
     const onChange = e => setFormDate({...formDate,[e.target.name]:e.target.value}) ;
     const onSubmit = e => {
         e.preventDefault();
         if(password !== password2){
             setAlert("password don't match","danger");
         }else{
             register({name,email,password});
         }
     }
     if(isAuthanticated){
      return <Redirect to="/dashboard" />
    }
    return (
        <Fragment>
        <h1 className="large text-primary">Sign Up</h1>
      <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
      <form className="form" onSubmit={e=>onSubmit(e)}>
        <div className="form-group">
          <input type="text" placeholder="Name" value={name} onChange={e=>onChange(e)} name="name"  />
        </div>
        <div className="form-group">
          <input type="email" placeholder="Email Address" value={email} onChange={e=>onChange(e)} name="email" />
          <small className="form-text">This site uses Gravatar so if you want a profile image, use a
            Gravatar email</small>
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            
            value={password} 
            onChange={e=>onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            
            value={password2}
             onChange={e=>onChange(e)}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
        </Fragment>
    );
};

Register.propTypes ={
  setAlert:PropTypes.func.isRequired,
  register:PropTypes.func.isRequired,
  isAuthanticated:PropTypes.bool
}
const mapStateToProps = state => ({
  isAuthanticated:state.auth.isAuthanticated
})
export default connect(mapStateToProps,{setAlert,register})(Register);