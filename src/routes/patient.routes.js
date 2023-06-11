import { Router } from "express";
import patientControllers from "../controllers/patient.controllers.js";

const patientRouter = Router();
patientRouter.post("/signup", patientControllers.createPatient);
patientRouter.post("/signin", patientControllers.signIn);

export default patientRouter;

