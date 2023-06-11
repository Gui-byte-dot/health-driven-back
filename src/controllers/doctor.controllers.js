import doctorRepository from "../repositories/doctor.repository.js";
import doctorServices from "../services/doctor.services.js";
import connectionDB from "../config/database.js";
import httpStatus from "http-status";
import bcrypt from "bcrypt";
import { v4 as uuidV4 } from "uuid";



async function createDoctor(req,res) {
    const {crm, nome, especialidade, image, email, password} = req.body;
 
    try{
        const {rowCount} = await doctorRepository.findByEmail(email);
        if(rowCount) throw new Error ("Internal Error");
        
        await doctorServices.createDoctor({crm, nome, especialidade, image, email, password});
        return res.sendStatus(httpStatus.CREATED);
    }catch(err){
        console.log(err);
        return res.status(500).send(err);
    }
};

async function signIn(req,res){
    const {email, password} = req.body;
 

    
    try{
        const {rows: users} = await connectionDB.query(`SELECT * FROM doctor WHERE email=$1`, [email]);
        if(users.length === 0) throw new Error;

        const [user] = users;
        const token = uuidV4();
        
        if (bcrypt.compareSync(password, user.password)) {
            await doctorRepository.createSession(token, user.id)
          }

        return res.status(201).send({ token: token });
    }catch(err){
        res.status(500).send(err.message);

    }
}


export default {createDoctor, signIn}