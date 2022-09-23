const {
  login,
  register,
  updateProfile,
  setAvatar,
  logOut,
  updateStatus,
} = require("../controllers/userController");

const router = require("express").Router();
const { authCheck } = require("../middlewares/auth");

router.post("/setavatar/:id", setAvatar);

router.post("/user/login", login);
router.post("/user", register);
router.get("/logout/:id", logOut);

router.put("/user/status", authCheck, updateStatus);
router.put("/user", authCheck, updateProfile);

module.exports = router;
