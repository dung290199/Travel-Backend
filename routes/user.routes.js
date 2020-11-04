const express = require("express");
const router = express.Router();
const { authJWT } = require("../middlewares");
const userController = require("../controllers/user.controller");

router.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

router.get("/all", userController.allAccess);

router.get("/user", authJWT.verifyToken, userController.userBoard);
router.get(
  "/mod",
  authJWT.verifyToken,
  authJWT.isModerator,
  userController.moderatorBoard
);
router.get(
  "/admin",
  authJWT.verifyToken,
  authJWT.verifyToken,
  authJWT.isAdmin,
  userController.adminBoard
);

module.exports = router;
