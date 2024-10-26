import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    USER_DETAILS_RESET,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,
    USER_UPDATE_PROFILE_RESET,
    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LIST_FAIL,
    USER_LIST_RESET,
    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DELETE_FAIL,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL,

} from '../constants/userConstants';

import { ORDER_LIST_MY_RESET } from '../constants/orderConstants';
import { CART_CLEAR_ITEMS } from '../constants/cartConstants';
import axiosInstance from '../actions/axiosInstance';
import {USER_APPOINTMENT_RESET} from '../constants/appointmentConstants';
import {DOCTOR_LIST_RESET} from '../constants/doctorConstants'

import { supabase } from '../supabaseClient';

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: USER_LOGIN_REQUEST });

        const { data: { user }, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) throw error;

        const userInfo = { id: user.id, email: user.email };
        
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: userInfo,
        });
        localStorage.setItem('userInfo', JSON.stringify(userInfo));

        
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.message || 'An error occurred during login.',
        });
    }
};


export const register = (name, email, password) => async (dispatch) => {
    try {
        dispatch({ type: USER_REGISTER_REQUEST });

        const { user, error } = await supabase.auth.signUp({
            email,
            password,
        });

        if (error) throw error;

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: user,
        });

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: user,
        });

        localStorage.setItem('userInfo', JSON.stringify(user));
    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.message || 'An error occurred during registration.',
        });
    }
};

export const logout = () => async (dispatch) => {
    await supabase.auth.signOut();
    localStorage.removeItem('userInfo');
    dispatch({ type: USER_LOGOUT });
    dispatch({ type: USER_DETAILS_RESET });
    dispatch({ type: ORDER_LIST_MY_RESET });
    dispatch({ type: USER_LIST_RESET });
    dispatch({ type: CART_CLEAR_ITEMS });
    dispatch({ type: USER_APPOINTMENT_RESET });
    dispatch({ type: DOCTOR_LIST_RESET });
};


export const getUserDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: USER_DETAILS_REQUEST });

        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('id', id)
            .single();

        if (error) throw error;

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: error.message || 'An error occurred while fetching user details.',
        });
    }
};


export const updateUserProfile = (user) => async (dispatch) => {
    try {
        dispatch({ type: USER_UPDATE_PROFILE_REQUEST });

        const { data, error } = await supabase
            .from('users') 
            .update(user)
            .eq('id', user.id);

        if (error) throw error;

        dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: USER_UPDATE_PROFILE_FAIL,
            payload: error.message || 'An error occurred while updating the user profile.',
        });
    }
};


// export const listUsers = () => async (dispatch, getState) => {
//     try {
//         dispatch({ type: USER_LIST_REQUEST });

//         const { data } = await axiosInstance.get('/api/users/');

//         dispatch({ type: USER_LIST_SUCCESS, payload: data });
//     } catch (error) {
//         dispatch({
//             type: USER_LIST_FAIL,
//             payload: error.response && error.response.data.detail
//                 ? error.response.data.detail
//                 : error.message,
//         });
//     }
// };

// export const deleteUser = (id) => async (dispatch) => {
//     try {
//         dispatch({ type: USER_DELETE_REQUEST });

//         const { data } = await axiosInstance.delete(`/api/users/delete/${id}/`);

//         dispatch({ type: USER_DELETE_SUCCESS, payload: data });
//     } catch (error) {
//         dispatch({
//             type: USER_DELETE_FAIL,
//             payload: error.response && error.response.data.detail
//                 ? error.response.data.detail
//                 : error.message,
//         });
//     }
// };

// export const updateUser = (user) => async (dispatch) => {
//     try {
//         dispatch({ type: USER_UPDATE_REQUEST });

//         const { data } = await axiosInstance.put(
//             `/api/users/update/${user._id}/`,
//             user
//         );

//         dispatch({ type: USER_UPDATE_SUCCESS });
//         dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
//     } catch (error) {
//         dispatch({
//             type: USER_UPDATE_FAIL,
//             payload: error.response && error.response.data.detail
//                 ? error.response.data.detail
//                 : error.message,
//         });
//     }
// };