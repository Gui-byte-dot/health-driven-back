import patientServices from "../services/patient.service.js";


async function createPatient(req,res) {
    const {crm, nome, especialidade, image,email, password} = req.body;
    try{
        await patientServices.createPatient(crm, nome, especialidade, image, email, password);
        return res.sendStatus(201);
    }catch(err){
        res.status(500).send(err.message);
        console.log(err);
    }
};

async function signIn(req,res){
    const {email, password} = req.body;
    try{
        const token = await patientServices.signIn(email,password);
        return res.status(201).send({ token });
    }catch(err){
        res.status(500).send(err.message);

    }
}

const patientControllers =  {
    createPatient,
    signIn
}

export default patientControllers;