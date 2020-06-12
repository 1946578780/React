const express = require("express");
const router = express.Router();
const isEmpty = require("lodash/isEmpty");
const validator = require("validator");
const sqlFn = require("../mysql")

//判断数据是否重复 
router.get("/", (req, res) => {
    //将域名的username值做条件判断
    var sql = "select * from user";
    var arr = [];
    sqlFn(sql, arr, function (data) {
        if (data.length > 0) {
            res.json(data)
        } else {
            res.send({})
        }
    })
})
//删除
router.post("/delete/:userdelete", (req, res) => {
    //将域名的username值做条件判断
    var sql = "delete from user where `id`=?";
    var arr = [req.params.userdelete];
    sqlFn(sql, arr, function (data) {
        if (data.affectedRows) {
            res.send({ success: true })
        } else {
            res.status(400).json({ error: "删除失败" })
        }
    })
})
//修改
router.post("/updata/:userupdata", (req, res) => {
    const id = req.params.userupdata
    var sql = "select * from user where `id`=?";
    var arr = [id];
    sqlFn(sql, arr, function (data) {
        console.log(data)
        if (data.length > 0) {
            res.json(data)
        } else {
            res.send({})
        }
    })
})
//修改
router.post("/userdata/:childDataId", (req, res) => {
    const id = req.params.childDataId
    var sql = "update user set email=?,username=?,password=?,password_digest=? where id=?"
    arr = [req.body.email, req.body.username, req.body.password, req.body.password_digest, id]
    sqlFn(sql, arr, function (data) {
        if (data.affectedRows) {
            var sql = "select * from user where `id`=?";
            var arr = [id];
            sqlFn(sql, arr, function (data) {
                if (data.length > 0) {
                    res.json(data)
                } else {
                    res.status(400).json({ error: "更新失败" })
                }
            })
        } else {
            res.status(400).json({ error: "修改失败" })
        }
    })
})
//添加
router.post("/modify", (req, res) => {
    var sql = "insert into user(email,username,password,password_digest) values(?,?,?,?)"
    arr = [req.body.email, req.body.username, req.body.password, req.body.password_digest]
    sqlFn(sql, arr, function (data) {
        if (data.affectedRows) {
            var sql = "select * from user";
            var arr = [];
            sqlFn(sql, arr, function (data) {
                if (data.length > 0) {
                    res.json(data)
                } else {
                    res.send({})
                }
            })
        } else {
            res.status(400).json({ error: "添加失败" })
        }
    })
})
module.exports = router;