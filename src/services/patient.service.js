import bcrypt from 'bcrypt';
import "dotenv/config";
import patientRepository from '../repositories/patient.repository.js';
import {v4 as uuidV4} from "uuid";

async function createPatient({ cpf, name, data_nascimento, email, password, image }) {
 
    const {rowCount} = await patientRepository.findByEmail(email);
    if(rowCount) throw new Error ("Internal Error");

    const hashPassword = await bcrypt.hash(password, 10);
    await patientRepository.createPatient({ cpf, name, data_nascimento, email, password: hashPassword, image });
}

async function signIn({email, password}) {

    const {rows: users} = await patientRepository.findByEmail(email);
    if(users.length === 0) throw new Error;

    const [user] = users;
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) throw new Error("Email or Password incorrect");


    const token = uuidV4();
    await patientRepository.createSession({token, userId:user.id});

    return token;
}

const patientServices = {
    createPatient,
    signIn
}

export default patientServices;