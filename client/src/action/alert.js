import uuid from 'uuid';
import {SET_ALERT,REMOVE_ALERT} from './type';

export const setAlert = (msg,alertType)=> dipatch =>{
    const id = uuid.v4();
    dipatch({
        type:SET_ALERT,
        payload:{msg,alertType,id}
    });
};