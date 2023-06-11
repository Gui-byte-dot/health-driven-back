import bcrypt from 'bcrypt';
import "dotenv/config";
import patientRepository from '../repositories/patient.repository.js';
import {v4 as uuidV4} from "uuid";

async function createPatient({ cpf, name, data_nascimento, email, password, image }) {
 
    const {rowCount} = await patientRepository.findByEmail(email);
    if(rowCount) throw new Error ("Internal Error");

    const hashPassword = bcrypt.hashSync(password, 10);
    await patientRepository.signUp({ cpf, name, data_nascimento, email, password: hashPassword, image });
}


export default {createPatient};