import {ADD_FLASH_MESSAGE,DELETE_FLASE_MESSAGE} from '../contants'
import shortid from 'shortid'   
import findIndex from 'lodash/findIndex' //lodash工具库需要去看看
//初始化一个state为一个数组 
const flashMessage = (state=[],action={})=>{
    switch(action.type){
        case ADD_FLASH_MESSAGE:
            return [
                ...state,
                {
                    id:shortid.generate(),
                    type:action.message.type,
                    text:action.message.text
                }
            ]
        case DELETE_FLASE_MESSAGE:
            //findIndex重载获取到id赋值给index
            const index = findIndex(state,{id:action.id});
            //判断消息是否存在
            if(index >=0){
                return[
                    ...state.slice(0,index),
                    ...state.slice(index+1)
                ]
            }
            return state;
        default:
            return state
    }
}
export default flashMessage