import axios from 'axios'

export const userSignupRequest = (userData)=>{
    //thunk
    //使用axios发送请求
    return dispatch=>{
        return axios.post("/api/users/",userData)
    }
}
//组件将值传递进来
export const isUserExists = (username)=>{
    return dispatch=>{
        //请求时将username传递给域名，剩下的交由后台处理
        return axios.get(`/api/users/${username}`,username)
    }
}
