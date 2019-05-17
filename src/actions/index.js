import * as actionTypes from './types';

export const setUser = user => {
    return {
        type: actionTypes.SET_USER,
        _payload: {
            currentUser: user
        },
        get payload() {
            return this._payload;
        },
        set payload(value) {
            this._payload = value;
        },
    }
}

export const clearUser=()=>{
    return{
        type:actionTypes.CLEAR_USER
    }
}