import axios from 'axios'
//多处需要使用到于是乎将token封装
const setToken = (token)=>{
    if(token){
        //网络请求时保存到请求头
        axios.defaults.headers.common['Authorization'] = `ilin ${token}`;
    }else{  
        delete axios.defaults.headers.common["Authorization"]
    }
}
export default setToken