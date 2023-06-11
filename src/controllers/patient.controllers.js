import httpStatus from "http-status";
import patientRepository from "../repositories/patient.repository.js";
import patientServices from "../services/patient.service.js";
import connectionDB from "../config/database.js";
import {v4 as uuidV4} from "uuid";
import bcrypt from "bcrypt";
import createSession from "../repositories/doctor.repository.js";



async function createPatient(req,res) {
    const {cpf, name, data_nascimento, email, password, image} = req.body;
    try{
        const {rowCount} = await patientRepository.findByEmail(email)
        if(rowCount) throw new Error("Internal Error");
        
        await patientServices.createPatient({cpf, name, data_nascimento, email, password, image});
        return res.sendStatus(httpStatus.CREATED);
    }catch(err){
        res.status(500).send(err);
        console.log(err);
    }
};

async function signIn(req,res){
    const {email, password} = req.body;
    try{
        const {rows: users} = await connectionDB.query(`SELECT * FROM patient WHERE email=$1`, [email]);
        if(users.length === 0) throw new Error;


        const [user] = users;
        const token = uuidV4();
        console.log(user);
        console.log(user.password)

        console.log(token);

        if (bcrypt.compareSync(password, user.password)) {
            await connectionDB.query(
                `
                    INSERT INTO "patientSessions" (token, "userId")
                    VALUES ($1, $2)  
                `
                [token, user.id]
            )
            
        }
        return res.status(201).send({ token: token });
    }catch(err){ 
        res.status(500).send(err.message);
        console.log(err);

    }
}

export default {
    createPatient,
    signIn
};