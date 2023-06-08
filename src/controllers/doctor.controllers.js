
import doctorServices from "../services/doctor.services.js";



async function createDoctor(req,res) {
    
    const {crm, nome, especialidade, image, email,password} = req.body;
    console.log(crm)

    


    try{
        await doctorServices.createDoctor(crm, nome, especialidade, image, email, password);
        return res.sendStatus(201);
    }catch(err){
        res.status(500).send(err.message);
        console.log(err);
    }
};

async function signIn(req,res){
    const {email, password} = req.body;
    try{
        const token = await doctorServices.signIn(email,password);
        return res.status(201).send({ token });
    }catch(err){
        res.status(500).send(err.message);

    }
}


export default {createDoctor, signIn}