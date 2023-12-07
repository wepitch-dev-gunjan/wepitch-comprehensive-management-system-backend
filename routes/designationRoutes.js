const express = require("express");
const { createDesignation, getDesignation, getDesignations, editDesignation, deleteDesignation } = require("../controllers/designationController");
const router = express.Router();

router.post("/designation", createDesignation);

router.get("/designation/:designation_id", getDesignation);
router.get("/designation", getDesignations);

router.put("/designation/:designation_id", editDesignation);

router.delete("/designation/:designation_id", deleteDesignation);

module.exports = router;
