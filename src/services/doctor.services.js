import bcrypt from "bcrypt";
import doctorRepository from '../repositories/doctor.repository.js';
import {v4 as uuidV4} from "uuid";
 
async function createDoctor({ crm, nome, especialidade, image,email,password}) {

 
    const {rowCount} = await doctorRepository.findByEmail(email);
    if(rowCount) throw new Error ("Internal Error");

    const encryptedPassword = bcrypt.hashSync(password, 10);


    await doctorRepository.signUp({ crm, nome, especialidade, image,email, password:encryptedPassword});

}



export default {createDoctor}