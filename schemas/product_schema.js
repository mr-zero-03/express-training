const Joi = require( 'joi' );

const id = Joi.string().uuid();
const name = Joi.string().min( 3 ).max( 30 );
const price = Joi.number().integer().min( 5 );
const image = Joi.string().uri();

const page = Joi.number().integer().min( 1 );
const perPage = Joi.number().integer().min( 1 ).max( 100 );

const createSchema = Joi.object( {
  name: name.required(),
  price: price.required(),
  image: image
} );

const updateSchema = Joi.object( {
  name: name,
  price: price,
  image: image
} ).min( 1 );

const getSchema = Joi.object( {
  id: id.required()
} );

const listSchema = Joi.object( {
  page: page,
  perPage: perPage
} );

//---
module.exports = {
  createSchema,
  updateSchema,
  getSchema,
  listSchema
};
