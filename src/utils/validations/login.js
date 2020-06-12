import validator from 'validator'
import isEmpty from 'lodash/isEmpty'

const validataInput = (data) => {
    let errors = {};
    if(validator.isEmpty(data.username)){
        errors.username = "请填写用户名"
    }
    if(validator.isEmpty(data.password)){
        errors.password = "请填写密码"
    }
    return{
        errors,
        isValid:isEmpty(errors)
    }
}
export default validataInput