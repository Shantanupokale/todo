import express from "express";

import { login, register, logout } from "../controllers/authlogic.js";

const router = express.Router();

router.post("/login", login);

router.post("/register", register);

router.post("/logout", logout);



export default router;


