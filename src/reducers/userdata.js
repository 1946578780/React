import {ADD_USER_INPUTDATA} from '../contants'
const initialState = {
    listViews:{}
}
const userdata = (state=initialState,action)=>{
    switch(action.type){
        case ADD_USER_INPUTDATA:
            return{
                // ...state,
                listViews: action.InputData
            }
        default:
            return state;
    }
}
export default userdata