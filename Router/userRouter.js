const express =require("express");

const { registerUser, loginUser, updateUser, deleteUser} = require("../Controller/useController");

const router = express.Router();

router.post("/register",registerUser);
router.post("/login",loginUser);
router.put("/update/:id",updateUser);
router.delete("/delete/:id",deleteUser);


module.exports = router;
