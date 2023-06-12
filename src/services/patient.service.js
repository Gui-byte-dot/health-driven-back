import bcrypt from 'bcrypt';
import "dotenv/config";
import patientRepository from '../repositories/patient.repository.js';
import {v4 as uuidV4} from "uuid";
import appointmentRepository from '../repositories/appointment.repository.js';

async function createPatient({ cpf, name, data_nascimento, email, password, image }) {
 
    const {rowCount} = await patientRepository.findByEmail(email);
    if(rowCount) throw new Error ("Internal Error");

    const hashPassword = bcrypt.hashSync(password, 10);
    await patientRepository.signUp({ cpf, name, data_nascimento, email, password: hashPassword, image });
}

async function createAppointment({doctor_id,patient_id,date,hours}){

    const {rows:[appointment]} = await appointmentRepository.findAppointment({doctor_id,patient_id,date,hours})
    if(appointment) throw new Error("Unavailable");

    await appointmentRepository.createAppointment({doctor_id,patient_id,date,hour})
}


export default {createPatient, createAppointment};