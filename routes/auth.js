import express from "express";
import { getusers, login, signin } from "../controllers/auth.js";

const router = express.Router();

router.route("/signin").post(signin).get(getusers)

router.route("/login").post(login)

export default router;


