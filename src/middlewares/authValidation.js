import doctorRepository from "../repositories/doctor.repository.js";
import patientRepository from "../repositories/patient.repository.js";
import connectionDB from "../config/database.js";
async function authValidation(req,res,next){
    const {authorization} = req.headers;
    const token = authorization?.replace("Bearer ", "");

    if(!token) return res.status(401).send("No token");

    try{
        const {rows: [patientSession]} = await connectionDB.query(`SELECT * FROM "patientSessions" WHERE token=$1`,[token]);
        const {rows: [doctorSession]} =  await connectionDB.query(`SELECT * FROM "doctorSessions" WHERE token=$1`,[token]);

        if(!patientSession && !doctorSession){
            return res.status(401).send("Sessions not found");
        } else if (!patientSession){
            const {rows: [user]} = await connectionDB.query(`SELECT * FROM doctor WHERE id=$1`,[doctorSession.userId]);
            if(!user) return res.status(401).send("User not found");
            res.locals.user = user.id;
            

        } else {
            const {rows: [user]} = await connectionDB.query(`SELECT * FROM patient WHERE id=$1`,[patientSession.userId]);
            if(!user) return res.status(401).send("User not found"); 
            res.locals.user = user.id;       
        }
    next();


    }catch(err){
        res.status(500).send(err);
        console.log(err);
    }
    


}
export default {authValidation}