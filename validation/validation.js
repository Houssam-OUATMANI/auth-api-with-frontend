const Joi = require('joi')

function registerValidation (data){

    const schema = Joi.object({
        name : Joi.string().min(4).max(25).required(),
        email : Joi.string().email().required(),
        password : Joi.string().min(8).max(1024).required()
    })
    
    return schema.validate(data)
}


function loginValidation (data){

    const schema = Joi.object({
        email : Joi.string().email().required(),
        password : Joi.string().min(8).max(1024).required()
    })

    return schema.validate(data)
}

module.exports.registerValidation = registerValidation
module.exports.loginValidation = loginValidation