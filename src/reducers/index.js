import {combineReducers} from 'redux'
import auth from './auth'
import flashMessage from './flashmessage'
import userdata from './userdata'
const rootReducer  = combineReducers({
    auth,
    flashMessage,
    userdata
})
export default rootReducer