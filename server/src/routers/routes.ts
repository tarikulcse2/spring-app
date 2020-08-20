import { Router } from "express";
import contactRoute from '../controllers/contact-controller';

const router = Router();

router.use("/contact", contactRoute.router);

export default router;
