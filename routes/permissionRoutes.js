const express = require("express");
const router = express.Router();
const { createPermission, getPermission, getPermissions, editPermission, deletePermission } = require('../controllers/permissionController')

router.post("/permission", createPermission);

router.get("/permission/:permission_id", getPermission);
router.get("/permission", getPermissions);

router.put("/permission/:permission_id", editPermission);

router.delete("/permission/:permission_id", deletePermission);

module.exports = router;
