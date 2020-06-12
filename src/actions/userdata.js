import axios from 'axios'
import {ADD_USER_INPUTDATA} from '../contants/index'
//访问用户数据
export const UserData =(Data)=>{
    return dispatch =>{
        return axios.get("/api/getuser",Data)
    }
}
//获取用户修改的数据
export const getInputData=(InputData)=>{
    return{
        type:ADD_USER_INPUTDATA,
        InputData
    }
}
//删除
export const UserDelete = (userdelete)=>{
    return dispatch=>{
        return axios.post(`/api/getuser/delete/${userdelete}`,userdelete)
    }
}
//获取修改
export const UserUpdata = (userupdata)=>{
    return dispatch=>{
        return axios.post(`/api/getuser/updata/${userupdata}`).then(res=>{
            const userdata = res.data[0]
            dispatch(getInputData(userdata))
        })
    }
}
//添加
export const UserModify = (usermodify)=>{
    return dispatch=>{
        return axios.post(`/api/getuser/modify/`,usermodify)
    }
}
//修改数据
export const UpdataUserdata = (updatauserdata,childDataId)=>{
    return dispatch=>{
        return axios.post(`/api/getuser/userdata/${childDataId}`,updatauserdata,childDataId)
    }
}