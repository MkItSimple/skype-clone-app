const router = require("express").Router();
const { authCheck } = require("../middlewares/auth");
const { upload, remove } = require("../controllers/cloudinary");

router.post("/uploadimage", authCheck, upload);
router.post("/removeimage", authCheck, remove);

module.exports = router;
