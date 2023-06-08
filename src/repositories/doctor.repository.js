import connectionDB from "../config/database.js";
import bcrypt from "bcrypt";

async function findByEmail (email){
    return await connectionDB.query(`SELECT FROM doctor WHERE email=$1`, [email])
}


async function createDoctor ({crm, nome, especialidade, image, email,password}) {
    const encryptedPassword = bcrypt.hashSync(password, 10);

    await connectionDB.query(
        `
            INSERT INTO doctor (crm, nome, especialidade, image, email, password)
            VALUES ($1, $2, $3, $4, $5, $6)

        `,
    [crm, nome, especialidade, image,email, encryptedPassword]

    );
}

async function createSession ({token, userId}) {
    return await connectionDB.query(
        `
            INSERT INTO "doctorSessions" (token, "userId")
            VALUES ($1, $2)  
        `
        [token, userId]
    )
}


export default {
    findByEmail,
    createDoctor,
    createSession
};