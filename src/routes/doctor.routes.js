import { Router } from "express";
import { validateSchema } from "../middlewares/schemaMiddleware.js";
import userSchema from "../schemas/userSchema.js";
import doctorControllers from "../controllers/doctor.controllers.js";

const doctorRouter = Router();
doctorRouter.post("/signup", validateSchema(userSchema.doctorSchema), doctorControllers.createDoctor);
doctorRouter.post("/signin", doctorControllers.signIn);

export default doctorRouter;