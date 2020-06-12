// import { createConnection } from "net";

const mysql = require("mysql") //导入mysql

//创建连接数据库
var client = mysql.createConnection({
    host: "localhost",      //本机
    user:"root",            //用户名
    password:"123",         //密码
    database:"iwenuser"     //数据库名
})
/**
 * 
 * @param {*} sql sql语句
 * @param {*} arr 条件参数
 * @param {*} callback 回调函数
 */
function sqlFn(sql,arr,callback){
    //query查询
    client.query(sql,arr,function(error,result){
        if(error){
            console.log(new Error(error))
            return
        }
        callback(result)
    })
}

module.exports = sqlFn