const express = require("express");
const router = express.Router();
const { createRole, getRole, getRoles, editRole, deleteRole } = require('../controllers/roleController')

router.post("/role", createRole);

router.get("/role/:role_id", getRole);
router.get("/role", getRoles);

router.put("/role/:role_id", editRole);

router.delete("/role/:role_id", deleteRole);

module.exports = router;
