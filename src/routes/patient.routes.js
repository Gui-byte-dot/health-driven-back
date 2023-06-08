import { Router } from "express";
import { validateSchema } from "../middlewares/schemaMiddleware.js";
import { patientSchema } from "../schemas/userSchema.js";
import patientControllers from "../controllers/patient.controllers.js";

const patientRouter = Router();
patientRouter.post("/signup", validateSchema(patientSchema), patientControllers.createPatient);
patientRouter.post("/signin", patientControllers.signIn);

export default patientRouter;

