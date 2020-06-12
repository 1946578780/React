import {SET_CURRENT_USER} from '../contants'
import isEmpty from 'lodash/isEmpty'

const initialState = {
    isAutenticated:false,
    user:{},
}
//将前端的状态信息交于redux中
const auth=(state=initialState,action)=>{
    switch(action.type){
        case SET_CURRENT_USER:
            return{
                //判断user是否有参数，取反为false
                isAutenticated:!isEmpty(action.user),
                user:action.user
            }
        default:
            return state;
    }
}
export default auth