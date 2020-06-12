const express = require("express")
const app = express();
const users = require("./routers/users")
const getuser = require("./routers/getuser")
const debug = require("debug")("my-application")
const bodyParser = require("body-parser")
const auth = require("./routers/auth")
//转换为json格式
app.use(bodyParser.json());
app.use("/api/users",users);
app.use("/api/auth",auth);
app.use("/api/getuser",getuser)
app.listen(4000,(req,res)=>{
    debug("服务器 OK")
})