const express = require('express');
const router = express.Router();

router.post("/voucher", createVoucher);
router.get("/voucher/:voucher_id", getVoucher);
router.get("/voucher", getVouchers);
router.put("/voucher/:voucher_id", editVoucher);
router.delete("/voucher/:voucher_id", deleteVoucher);

module.exports = router;