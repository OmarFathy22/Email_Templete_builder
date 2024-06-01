import express from "express";
import Template from "./templete.js";


const router = express.Router();

router.use("/templete", Template);

export default router;
