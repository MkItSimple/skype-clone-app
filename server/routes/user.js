const { allUsers } = require("../controllers/userController");

const router = require("express").Router();
const { authCheck } = require("../middlewares/auth");
router.get("/user", authCheck, allUsers);
router.get("/user/contacts", authCheck, allUsers);

module.exports = router;
