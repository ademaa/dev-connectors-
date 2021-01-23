import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Route,Redirect} from 'react-router-dom';

const privateRoute = ({component:Component,auth:{isAuthanticated,loading},...rest}) =>
<Route {...rest} render={props =>
 !isAuthanticated && !loading ? (<Redirect to="/login" />): <Component {...props}/>} />
 
privateRoute.propTypes = {
    auth:PropTypes.object.isRequired
}
const mapStateToProps = state =>({
    auth: state.auth
})
export default connect(mapStateToProps)(privateRoute)
