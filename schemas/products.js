const Joi = require( 'joi' );

//-- Structure Fields
const id = Joi.string().uuid();
const name = Joi.string().min( 3 ).max( 30 );
const price = Joi.number().integer().min( 5 );
const image = Joi.string().uri();
const isBlocked = Joi.boolean();

//-- Pagination
const page = Joi.number().integer().min( 1 );
const perPage = Joi.number().integer().min( 1 ).max( 100 );


// --------- Structures ---------

// --- CREATE ---
const create = Joi.object( {
  name: name.required(),
  price: price.required(),
  image: image
} );

// --- READ ---
//-- Get
const get = Joi.object( {
  id: id.required()
} );

//-- List
const list = Joi.object( {
  page: page,
  perPage: perPage
} );

// --- UPDATE ---
//-- Put
const putUpdate = Joi.object( {
  name: name.required(),
  price: price.required(),
  image: image,
  isBlocked: isBlocked
} );

//-- Patch
const patchUpdate = Joi.object( {
  name: name,
  price: price,
  image: image,
  isBlocked: isBlocked
} ).min( 1 );


//---
module.exports = {
  create,
  get,
  list,
  putUpdate,
  patchUpdate
};
