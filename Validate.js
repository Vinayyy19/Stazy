const Joi = require('joi');

module.exports.schema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    country: Joi.string().required(),
    location: Joi.string().required(),
    price: Joi.number().required().min(0),
    image: Joi.object({
        url: Joi.string().required(),
        fileName: Joi.string().required()
    }),
});


module.exports.reviewSchema = Joi.object({
        comment : Joi.string().required(),
        rating : Joi.number().required().min(0).max(5)
});