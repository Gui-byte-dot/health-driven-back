import joi from 'joi';

export const doctorSchema = joi.object({
    crm:joi.number().required(),
    nome:joi.string().required(),
    especialidade:joi.string().required(),
    image:joi.string().required(),
    email:joi.string().email().required(),
    password:joi.string().required()

});

export const patientSchema = joi.object({
    cpf:joi.number().required(),
    name:joi.string().required(),
    data_nascimento:joi.date().required(),
    image:joi.string().required(),
    email:joi.string().email().required(),
    password:joi.string().required()

});


