import httpStatus from "http-status";
import patientRepository from "../repositories/patient.repository.js";
import patientServices from "../services/patient.service.js";
import connectionDB from "../config/database.js";
import {v4 as uuidV4} from "uuid";
import bcrypt from "bcrypt";
import appointmentRepository from "../repositories/appointment.repository.js";
import doctorRepository from "../repositories/doctor.repository.js";



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


        if (bcrypt.compareSync(password, user.password)) {
            console.log(token);
            await connectionDB.query(
                `INSERT INTO "patientSessions" (token, "userId")
                    VALUES ($1, $2)  
                `,
                [token, user.id]
            )
            
            
        }
        return res.status(201).send({ token: token });
    }catch(err){ 
        res.status(500).send(err.message);
        console.log(err);

    }
}

async function createAppointment(req,res){
    const id = res.locals.user;
    console.log(id);
    const {doctor_id,date,hours} = req.body;

    const {rows:[appointment]} = await connectionDB.query(
        `
            SELECT * FROM appointments WHERE "doctor_id"=$1 AND date=$2 AND hours=$3
        `,[doctor_id, date, hours]
    );
    if(appointment) throw new Error("Unavailable");

    try{
        await appointmentRepository.createAppointment({doctor_id, patient_id:id, date, hours});
        return res.sendStatus(201);
    }catch(err){
        res.status(500).send(err.message);
        console.log(err);
        
    }
}

async function findByDoctor(req,res){
    const nome = req.query.nome;
    const especialidade = req.query.especialidade;
   
    if(nome){
        const {rows, rowCount} = await doctorRepository.findByName(nome);
        console.log(rows);
        if(!rowCount) throw new Error("Internal Error");
        return res.send(rows);
    } else if(especialidade){
        const {rows, rowCount} = await doctorRepository.findByEspecialty(especialidade);
        if(!rowCount) throw new Error("Internal Error");
        return res.send(rows);
    }
}

async function getAPpointments(req,res){
    const patient_id = res.locals.user;

    try{
        const {rows} = await connectionDB.query(
            `SELECT appointments.*, doctor.nome, doctor.especialidade 
            FROM appointments JOIN doctor
            ON appointments."doctor_id" = doctor.id WHERE "patient_id"=$1`,[patient_id]);   
        return res.status(201).send(rows);
    }catch(err){
        return res.status(500).send(err.message);
    }
}


export default {
    createPatient,
    signIn,
    createAppointment,
    findByDoctor,
    getAPpointments
};