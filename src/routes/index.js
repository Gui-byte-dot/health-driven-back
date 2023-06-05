import { Router } from "express";
import patientRouter from "./patient.routes.js";
import doctorRouter from "./doctor.routes.js";

const routes = Router();
routes.use("/patient", patientRouter);
routes.use("/doctor", doctorRouter);

export default routes;