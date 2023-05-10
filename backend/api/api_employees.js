const express = require("express");
const router = express.Router();
const db = require("../db");
const {v4 : uuidv4} = require("uuid");
const multer = require("multer");
const path = require("path")


// add employees
router.post("/jdb/employees/add", function (req, res) {
    let img_profile = "";
    const storage = multer.diskStorage({
        destination: function(req, file, cb){
            cb(null,'./image' )
        },
        filename: function(req, file, cb){
            img_profile = uuidv4() + path.extname(file.originalname)
            cb(null, img_profile)
        }
    })
    const upload = multer({storage: storage}).single("picProfile")
    upload(req, res, function (err){
        
        const emp_uuid = uuidv4()
        const emp_name = req.sanitize(req.body.emp_name)
        const profile = img_profile
        const salary = req.sanitize(req.body.salary)
        const dep_uuid = req.sanitize(req.body.dep_uuid)

        let sql = "INSERT INTO tbl_employees (emp_uuid,emp_name,profile,salary,dep_uuid) VALUES ?"
        let values = [[
            emp_uuid, emp_name, profile, salary, dep_uuid
        ]]
        db.query(sql, [values], function(err, rs){
            if(err) throw err;
            
            res.json({status: "Success!!", message: "Add employees Success!!"})
        })
    })
})

//Update employees
router.post("/jdb/employee/update", function (req,res){
    let img_profile = "";
    const storage = multer.diskStorage({
        destination: function(req, file, cb){
            cb(null,'./image' )
        },
        filename: function(req, file, cb){
            img_profile = uuidv4() + path.extname(file.originalname)
            cb(null, img_profile)
        }
    })
    const upload = multer({storage: storage}).single("picProfile")
    upload(req, res, function (err){
        
        const emp_uuid = req.sanitize(req.body.emp_uuid)
        const emp_name = req.sanitize(req.body.emp_name)
        const profile = img_profile
        const salary = req.sanitize(req.body.salary)
        const dep_uuid = req.sanitize(req.body.dep_uuid)

        let sql = "Update tbl_employees SET ? WHERE emp_uuid = ?"
        let values = {
            "emp_name" : emp_name,
            "salary" : salary,
            "dep_uuid" : dep_uuid
        }

        let uploadImage = {
            "profile" : profile
        }

        if(img_profile != ""){
            //merge object
            values = { ...values, ...uploadImage}
        }

        db.query(sql, [values, emp_uuid], function(err, rs){
            if(err) throw err;
            
            res.json({status: "Success!!", message: "Update employees Success!!"})
        })
    })

})

//show all employees
router.get("/jdb/employees", function (req,res) {
    db.query("SELECT e.emp_name, e.profile, e.salary , d.dep_name FROM tbl_department d JOIN tbl_employees e ON e.dep_uuid = d.dep_uuid", function(err, rs){
        if (err) throw err

        if (rs.length > 0) {
            res.json(rs)
        }else {
            res.status(404).json({status: "error", message: "Not Found"})
        }
        }
    )
})

//show only 1 person employee
router.get("/jdb/employees/:uuid", function (req,res) {
    const uuid = req.sanitize(req.params.uuid)
    console.log(uuid)

    let sql = "SELECT e.emp_name, e.profile, e.salary , d.dep_name FROM tbl_department d JOIN tbl_employees e ON e.dep_uuid = d.dep_uuid WHERE e.emp_uuid = ? "
    db.query(sql, [uuid], function(err, rs){
        if (err) throw err

        if (rs.length > 0) {
            res.json(rs[0])
        }else {
            res.status(404).json({status: "error", message: "Not Found"})
        }
        }
    )
})

//Delete Employee
router.post("/jdb/employee/delete", function(req,res){
    const uuid = req.sanitize(req.body.uuid)
    let sql = "DELETE FROM tbl_employees WHERE emp_uuid = ?"
    db.query(sql, [uuid], function(err, rs){
        if (err) throw err
        res.json({status: "success", message: "Delete success"})
    })
})


module.exports = router;