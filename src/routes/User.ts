import { Router } from "express";
const router: Router = Router();

import { createUserController, loginUserController } from "../controller/User";


router.post("/login", loginUserController);

router.post("/create", createUserController);

export default router;
