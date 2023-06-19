import { Router } from "express";
import patientControllers from "../controllers/patient.controllers.js";
import authMiddleware from "../middlewares/authValidation.js";


const patientRouter = Router();

patientRouter.post("/signup", patientControllers.createPatient);
patientRouter.post("/signin", patientControllers.signIn);
patientRouter.post("/appointment",authMiddleware.authValidation,patientControllers.createAppointment);
patientRouter.get("/search",authMiddleware.authValidation, patientControllers.findByDoctor);
patientRouter.get("/appointments",authMiddleware.authValidation, patientControllers.getAPpointments);

export default patientRouter;

