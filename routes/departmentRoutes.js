const express = require("express");
const router = express.Router();

const { createDepartment, getDepartment, getDepartments, editDepartment, deleteDepartment } = require('../controllers/departmentController')

router.post("/department", createDepartment);

router.get("/department/:department_id", getDepartment);
router.get("/department", getDepartments);

router.put("/department/:department_id", editDepartment);

router.delete("/department/:department_id", deleteDepartment);

module.exports = router;
