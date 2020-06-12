import axios from 'axios'
import setToken from '../utils/validations/setToken'
import { SET_CURRENT_USER } from "../contants";
import jwtdecode from "jwt-decode"; //解密 token cnpm install --save decode

//触发reducer将user传入
export const setCurrentUser = (user) => {
    return{
        type: SET_CURRENT_USER,
        user
    }
}
//退出登录状态
export const logout = ()=>{
    return dispatch=>{
        localStorage.removeItem("jwtToken");//清除jxtToken
        //清除请求头信息
        setToken(false);
        //清除Token数据
        dispatch(setCurrentUser({}))
    }
}
export const login = (data) => {
    return dispatch => {
        return axios.post("/api/auth", data).then(res => {
            const token = res.data; //获取token
            localStorage.setItem('jwtToken', token); //保存到本地
            setToken(token) //此时获取到token可交于后台处理
            dispatch(setCurrentUser(jwtdecode(token))) //分发事件触发并将解密后的token传入
        })
    }
}