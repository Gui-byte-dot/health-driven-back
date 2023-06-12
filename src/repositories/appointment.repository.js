import connectionDB from "../config/database.js";

async function createAppointment({doctor_id,patient_id,date,hours}){
    await connectionDB.query(`
        INSERT INTO appointments ("doctor_id","patient_id",date,hours)
        VALUES ($1,$2,$3,$4)
    `,[doctor_id,patient_id,date,hours])
}

async function findAppointment({doctor_id, date, hours}){
    await connectionDB.query(
        `
            SELECT * FROM appointments WHERE "doctor_id"=$1 AND date=$2 AND hours=$3
        `,[doctor_id, date, hours]
    )
}


export default {createAppointment, findAppointment};