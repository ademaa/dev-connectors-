import axios from 'axios';
import {
    GET_POSTS,
    GET_POST,
    POST_ERROR,
    UPDATE_LIKES,
    REMOVE_POST,
    ADD_POST,
    ADD_COMMENT,
    REMOVE_COMMENT
} from './type';
import {setAlert} from './alert';

//get all posts
export const getPosts = () => async dispatch =>{
    try {
        const res = await axios.get('/api/posts');
        dispatch({
            type:GET_POSTS,
            payload:res.data
        })
    } catch (err) {
        dispatch({
            type:POST_ERROR,
            payload:{ msg:err.response.statusText, status:err.response.status }
        })
    }
}
// get post by id
export const getPost = id => async dispatch =>{
    try {
        const res = await axios.get(`/api/posts/${id}`);
        dispatch({
            type:GET_POST,
            payload:res.data
        })
    } catch (err) {
        dispatch(({
            type:POST_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        }))
    }
}

//add like
 export const addLike = id => async dispatch =>{
     try {
         const res = await axios.put(`/api/posts/like/${id}`);
         dispatch({
             type:UPDATE_LIKES,
             payload:{id,likes:res.data}
         });
     } catch (err) {
         dispatch({
             type:POST_ERROR,
             payload:{msg:err.response.statusText,status:err.response.status}
         });
     }
 }
 //remove like
 export const removeLike = id => async dispatch =>{
     try {
         const res = await axios.put(`/api/posts/unlike/${id}`);
         dispatch({
             type:UPDATE_LIKES,
             payload:{id,likes:res.data}
         });
     } catch (err) {
         dispatch({
             type:POST_ERROR,
             payload:{msg:err.response.statusText,status:err.response.status}
         });
     }
 }
  //delete post 
  export const deletePost = id => async dispatch =>{
    try {
         await axios.delete(`/api/posts/${id}`);
        dispatch({
            type:REMOVE_POST,
            payload:id
        });
        dispatch(setAlert('post has been deleted','success'));
    } catch (err) {
        dispatch({
            type:POST_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        });
    }
};
//add post 
export const addPost = formData => async dispatch => {
const config = {
    headers:{
        'Content-Type':'application/json'
    }
}
try {
    const res = await axios.post('/api/posts',formData,config);
    dispatch({
        type:ADD_POST,
        payload:res.data
    });
    dispatch(setAlert('new post added','success'));
} catch (err) {
    const errors = err.response.data.errors;
        if(errors){
         errors.forEach(error => 
             dispatch(setAlert(error.msg,'danger')));
        }
    dispatch({
        type:POST_ERROR,
        payload:{msg:err.response.statusText,status:err.response.status}
    });
}
};

//add comment 
export const addComment = (postId,formData) => async dispatch => {
    const config = {
        headers:{
            'Content-Type':'application/json'
        }
    }
    try {
        const res = await axios.post(`/api/posts/comment/${postId}`,formData,config);
        dispatch({
            type:ADD_COMMENT,
            payload:res.data
        });
        dispatch(setAlert('comment added','success'));
    } catch (err) {
        dispatch({
            type:POST_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        });
    }
}
//delete comment 
export const deleteComment = (postId,commentId) => async dispatch => {
    try {
         await axios.delete(`/api/posts/comment/${postId}/${commentId}`);
        dispatch({
            type:REMOVE_COMMENT,
            payload:commentId
        });
        dispatch(setAlert('comment removed','success'));
    } catch (err) {
        dispatch({
            type:POST_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        });
    }
}