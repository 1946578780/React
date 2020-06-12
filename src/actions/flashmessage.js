import {ADD_FLASH_MESSAGE,DELETE_FLASE_MESSAGE} from '../contants'
//action
export const addFlashMeeage = (message)=>{
    return{
        type:ADD_FLASH_MESSAGE,
        message
    }
}
export const deleteFlashMessage = (id)=>{
    return{
        type:DELETE_FLASE_MESSAGE,
        id
    }
}