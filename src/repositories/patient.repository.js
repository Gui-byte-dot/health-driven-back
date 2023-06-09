import connectionDB from "../config/database.js"

async function findByEmail (email){
    return await connectionDB.query(`SELECT * FROM patient WHERE email=$1`, [email])
}

async function signUp ({cpf, name, data_nascimento, email, password, image}){
    await connectionDB.query(
    `
        INSERT INTO patient (cpf, name, "data_nascimento", email, password, image)
        VALUES ($1, $2, $3, $4, $5, $6)

    `,
    [cpf, name, data_nascimento, email, password, image]
    );
}

async function createSession ({token, userId}) {
    await connectionDB.query(
        `
            INSERT INTO "patientSessions" (token, "userId")
            VALUES ($1, $2)  
        `
        [token, userId]
    )
}

async function findToken(token){
    return await connectionDB.query(`SELECT * FROM "patientSessions" WHERE token=$1`,[token]);
}
async function findById(id){
    return await connectionDB.query(`SELECT * FROM patient WHERE id=$1`,[id]);
} 



export default {
    signUp,
    createSession,
    findByEmail,
    findToken,
    findById
};