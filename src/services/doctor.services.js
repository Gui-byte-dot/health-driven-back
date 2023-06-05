import bcrypt from 'bcrypt';
import "dotenv/config";
import doctorRepository from '../repositories/doctor.repository.js';
import {v4 as uuidV4} from "uuid";

async function createDoctor({ crm, nome, especialidade, image,email, password }) {
 
    const {rowCount} = await doctorRepository.findByEmail(email);
    if(rowCount) throw new Error ("Internal Error");

    const hashPassword = await bcrypt.hash(password, 10);
    await doctorRepository.createDoctor({ crm, nome, especialidade, image,email, password: hashPassword });
}

async function signIn({email, password}) {

    const {rows: users} = await doctorRepository.findByEmail(email);
    if(users.length === 0) throw new Error;

    const [user] = users;
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) throw new Error("Email or Password incorrect");


    const token = uuidV4();
    await doctorRepository.createSession({token, userId:user.id});

    return token;
}

const doctorServices = {
    createDoctor,
    signIn
}

export default doctorServices;