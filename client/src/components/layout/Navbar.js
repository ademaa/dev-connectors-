import React,{Fragment} from 'react'
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {logout} from '../../action/auth'; 
import PropTypes from 'prop-types';

const Navbar = ({auth:{isAuthanticated,loading},logout}) =>{ 
  const authList =(
    <ul>
  <li><Link onClick={logout} to="/">
  <i className="fas fa-sign-out-alt"></i>{' '}
  <span className='hide-sm'>logout</span></Link></li>
</ul>
  );
  const guestList =(
<ul>
  <li><Link to="#!">Developers</Link></li>
  <li><Link to="/register">Register</Link></li>
  <li><Link to="/login">Login</Link></li>
</ul>
  );
  return(
 <nav className="navbar bg-dark">
<h1>
  <Link to="/"><i className="fas fa-code"></i> DevConnector</Link>
</h1>
{!loading && (<Fragment>{isAuthanticated?authList:guestList}</Fragment>)}
</nav>
)}
Navbar.propTypes ={
  logout:PropTypes.func.isRequired,
  auth:PropTypes.object.isRequired
}
const mapStateToProps = state =>({
  auth:state.auth
})
export default connect(mapStateToProps,{logout})(Navbar);