import { Router } from "express";
import { validateSchema } from "../middlewares/schemaMiddleware.js";
import userSchema from "../schemas/userSchema.js";
import doctorControllers from "../controllers/doctor.controllers.js";
import authMiddleware from "../middlewares/authValidation.js";

const doctorRouter = Router();
doctorRouter.post("/signup", validateSchema(userSchema.doctorSchema), doctorControllers.createDoctor);
doctorRouter.post("/signin", doctorControllers.signIn);
doctorRouter.get("/appointments",authMiddleware.authValidation, doctorControllers.getAPpointments);


export default doctorRouter;