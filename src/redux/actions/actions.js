// src/redux/actions/actions.js
/** */
import axios from 'axios';
//const url = "http://localhost:5000/api/"
const url = process.env.NODE_ENV === 'production' ? "/api/" : "http://localhost:5000/api/";

export function loadTrips () {
    return (dispatch) => {
        axios.get(`${url}trips`)
        .then((res) => {
            let trips = res.data;
            dispatch({type:'LOAD_TRIPS', trips});
        }).catch((err) => {
            console.log(err);
        });
    };
}

export function getUser (_id) {
    return axios.get(`${url}user/${_id}`).then((res)=>{
        return res.data;
    }).catch(err=>console.log(err));
}

export function getUserProfile (_id) {
    return (dispatch) => {
        axios.get(`${url}user/profile/${_id}`).then((res)=>{
            let profile = res.data;
            dispatch({type: 'SET_PROFILE', profile});
        }).catch(err=>console.log(err));
    };
}

export function getTrip (trip_id) {
    return (dispatch) => {
        axios.get(`${url}trip/${trip_id}`)
        .then((res) => {
            let trip = res.data;
            dispatch({type: 'VIEW_TRIP', trip});
        }).catch((err) => console.log(err));
    };
}

// trip_id, author_id, comment
export function comment () {
    return (dispatch) => {
    };
}

//req.body.trip_id
export function clap (trip_id) {
    return (dispatch) => {
        axios.post(`${url}trip/clap`,{ trip_id }).then((res) => {
            dispatch({type:'CLAP_TRIP'});
        }).catch((err)=>console.log(err));
    };
}

//id, user_id
export function follow (id, user_id) {
    return (dispatch) => {
        axios.post(`${url}user/follow`,{ id, user_id }).then((res) => {
            dispatch({type:'FOLLOW_USER', user_id});
        }).catch((err)=>console.log(err));
    };
}

export function SignInUser (user_data) {
    return (dispatch) => {
        axios.post(`${url}user`,user_data).then((res)=>{
            let user = res.data;
            localStorage.setItem('Auth', JSON.stringify(user));
            dispatch({type: 'SET_USER', user});
        }).catch((err)=>console.log(err));
    };
}

export function toggleClose() {
    return (dispatch) => {
        dispatch({type: 'TOGGLE_MODAL', modalMode: false});
    };
}

export function toggleOpen() {
    return (dispatch) => {
        dispatch({type: 'TOGGLE_MODAL', modalMode: true});
    };
}
