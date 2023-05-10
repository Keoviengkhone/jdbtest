
const express = require("express");
const router = express.Router();
const db = require("../db");
const {v4 : uuidv4} = require("uuid");
const multer = require("multer");

router.post("/jdb/department/add", function(req,res){
    const dep_uuid = uuidv4()
    const dep_name = req.sanitize(req.body.dep_name)
    let sql = "INSERT INTO tbl_department (dep_name,dep_uuid) VALUES ?"
    let data = [[
        dep_name,
        dep_uuid
    ]]
    db.query(sql, [data], function (err, rs){
        if(err) throw err;
            
        res.json({status: "Success!!", message: "Add department Success!!"})
    })
})

module.exports = router;
