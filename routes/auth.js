import express from "express";
import { getusers, login, signin, verifyd } from "../controllers/auth.js";

const router = express.Router();

router.route("/signin").post(signin).get(getusers)

router.route("/login").post(login)

router.route("/token").post(verifyd)

export default router;


