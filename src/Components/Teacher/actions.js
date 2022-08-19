import axiosInstance from "../../axiosInstance";
import getCookie from "../../getCookies";
import { ADD_QUESTION, ADD_TEST, GET_QUESTION, GET_TEST, GET_TESTS } from "./types";

let access = getCookie("access_token");

const headers = {
    Authorization:
    `Bearer ${access}`,
    "Content-Type": "application/json",
}

export const getTests = (callback) =>{
    return dispatch =>{
        axiosInstance.get('/api/tests/',{
            headers : headers
        })
        .then((res)=>{
            console.log(res)
        })
        .catch((e)=>{
            console.log(e)
        })
    }
}

export const getTestById = (id,callback) =>{
    return dispatch =>{
        axiosInstance.get(`/api/tests/${id}`,{
            headers : headers
        })
        .then((res)=>{
            if(res.status === 200){
                dispatch({
                    type : GET_TEST,
                    payload : res.data
                })
            }
            callback(res)
        })
        .catch((e)=>{
            callback(e.response)
        })
    }
}


export const deleteTestById = (id,callback) =>{
    return dispatch =>{
        axiosInstance.delete(`/api/tests/${id}`,{
            headers : headers
        })
        .then((res)=>{
            console.log(res)
        })
        .catch((e)=>{
            console.log(e)
        })
    }
}

export const addTest = (data, callback)=>{
    return dispatch =>{
        axiosInstance.post('/api/tests/',data,{
            headers : headers
        })
        .then((res)=>{
            callback(res)
        })
        .catch((e)=>{
            callback(e.response)
        })
    }
}

export const editTest = (id,data, callback)=>{
    return dispatch =>{
        axiosInstance.patch(`/api/tests/${id}`,data,{
            headers : headers
        })
        .then((res)=>{
            console.log(res)
        })
        .catch((e)=>{
            console.log(e)
        })
    }
}

export const addQuestion = (data, callback)=>{
    return dispatch =>{
        axiosInstance.post('/api/questions/',data,{
            headers : headers
        })
        .then((res)=>{
            if(res.status === 200){
                dispatch({
                    type : ADD_TEST,
                    payload : res.data
                })
            }
            callback(res)
        })
        .catch((e)=>{
            callback(e.response)
        })
    }
}

export const editQuestion = (id,data, callback)=>{
    return dispatch =>{
        axiosInstance.patch(`/api/questions/${id}/`,data,{
            headers : headers
        })
        .then((res)=>{
            callback(res)
        })
        .catch((e)=>{
            callback(e.response)
        })
    }
}


export const getQuestionById = (id,callback) =>{
    return dispatch =>{
        axiosInstance.get(`/api/questions/${id}`,{
            headers : headers
        })
        .then((res)=>{
            if(res.status === 200){
                dispatch({
                    type : GET_QUESTION,
                    payload : res.data
                })
            }
            callback(res)
        })
        .catch((e)=>{
            callback(e.response)
        })
    }
}


