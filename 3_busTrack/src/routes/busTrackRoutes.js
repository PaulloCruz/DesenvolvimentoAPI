import { Router } from "express";;

import {postLinhas,postMotoristas,postOnibus,getLinhas, getMotoristas,getOnibus} from "../controllers/linhasController.js";

const router = Router();

router.post("/linhas",postLinhas);
router.post("/motoristas",postMotoristas);
router.post("/onibus",postOnibus);
router.get("/linhas/:id",getLinhas)
router.get("/motoristas/:id",getMotoristas)
router.get("/onibus/:id",getOnibus)

export default router;