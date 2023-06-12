import connectionDB from "../config/database.js";

export async function findByEmail (email){
    return await connectionDB.query(`SELECT * FROM doctor WHERE email=$1`, [email])
}


async function signUp ({crm, nome, especialidade, image, email,password}) {

    await connectionDB.query(
        `INSERT INTO doctor (crm, nome, especialidade, image, email, password)
        VALUES ($1, $2, $3, $4, $5, $6)`,
    [crm, nome, especialidade, image,email, password]

    );
}

async function createSession ({token, userId}) {
    await connectionDB.query(
        `
            INSERT INTO "doctorSessions" (token, "userId")
            VALUES ($1, $2)  
        `
        [token, userId]
    )
}

async function findToken(token){
    return await connectionDB.query(`SELECT * FROM "doctorSessions" WHERE token=$1`,[token]);
}


async function findById(id){
    return await connectionDB.query(`SELECT * FROM doctor WHERE id=$1`,[id]);
} 

export default {createSession, findByEmail, signUp, findToken, findById}