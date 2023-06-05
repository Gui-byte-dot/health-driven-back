import connectionDB from "../config/database.js";

async function findByEmail (email){
    return await connectionDB.query(`SELECT FROM doctor WHERE email=$1`, [email])
}


async function createDoctor ({crm, nome, especialidade, image, email, password}) {
    await connectionDB.query(
        `
            INSERT INTO doctor (crm, nome, especialidade, image, email, password)
            VALUES ($1, $2, $3, $4, $5, $6)

        `
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


const doctorRepository = {
    findByEmail,
    createDoctor,
    createSession
}

export default doctorRepository;