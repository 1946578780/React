const express = require("express");
const router = express.Router();
const isEmpty = require("lodash/isEmpty");
const validator = require("validator");
const sqlFn = require("../mysql")
//判断文本框状态并返回
const validatorInput=(data)=>{
    let errors = {};
    if(validator.isEmpty(data.username)){
        errors.username="请填写用户名"
    }                       
    if(validator.isEmpty(data.email)){
        errors.email="请填写邮箱"
    }
    if(validator.isEmpty(data.password)){
        errors.password="请填写密码"
    }
    if(validator.isEmpty(data.passwordConfirmation)){
        errors.passwordConfirmation="请确认密码"
    }
    if(!validator.equals(data.password,data.passwordConfirmation)){
        errors.passwordConfirmation="两次密码不同"
    }
    //返回状态
    return{
        errors,
        isValid: isEmpty(errors)
    }
}   
//请求时将状态获取
router.post("/",(req,res)=>{
    //将validatorInput中的data通过.body获取
    const {errors,isValid} = validatorInput(req.body);
    const sql = "insert into user(email,username,password,password_digest) values(?,?,?,?)";
    var arr = [req.body.email,req.body.username,req.body.password,req.body.passwordConfirmation]
    console.log(arr)
    if(isValid){
        sqlFn(sql,arr,function(data){
            if(data.affectedRows){//受影响行数
                res.send({success:true})
            }else{
                res.status(400).json({error:'注册失败'})
            }
        })
    }else{
        res.status(400).json(errors)
    }
})

//判断数据是否重复 
router.get("/:username",(req,res)=>{
//将域名的username值做条件判断
    var sql = "select * from user where `username`=?";
    var arr = [req.params.username];
    sqlFn(sql,arr,function(data){
        if(data){
            res.send(data)
        }else{
            res.send({})
        }
    })
})

module.exports = router;