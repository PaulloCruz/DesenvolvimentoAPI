import { Router } from "express";

import {postLinhas} from "../controllers/linhasController.js"

const router = Router()

router.post("/linhas",postLinhas)

export default router