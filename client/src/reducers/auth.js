import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    ACCOUNT_DELETED
} from '../action/type';

const initialState = {
    token : localStorage.getItem('token'),
    isAuthanticated: null,
    loading:true,
    user:null
};
const auth = (state = initialState,action)=>{
    const {type,payload} = action;
    switch (type) {
        case USER_LOADED:
            return{
                ...state,
                isAuthanticated:true,
                loading:false,
                user:payload
            }
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token',payload.token);
            return {
                ...state,
                ...payload,
                isAuthanticated:true,
                loading:false,
            }
        case REGISTER_FAIL:
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT:
        case ACCOUNT_DELETED:
            localStorage.removeItem('token');
            return {
                ...state,
                token:null,
                isAuthanticated:false,
                loading:false
            }
        default:
           return state;
    }
}
export default auth;