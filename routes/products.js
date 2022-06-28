const express = require( 'express' );
const router = express.Router();

//--
const products = require( '../controllers/products' );

//-- Routes
/*router.post( '/', ( req, res ) => { //Create (Multiple and random)
  const amount = req.query.amount;

  let product = {};
  if ( !isNaN( parseInt( amount ) ) || amount === 'random' ) {
    product = products.create( amount );
  } else {
    product = products.create();
  }

  res.json( {
    message: 'Products created correctly',
    data: product
  } );
} );*/

router.use( express.json() ); //Middleware to manage the JSON

router.post( '/', ( req, res ) => { //Create
  const body = req.body;

  const createdProduct = products.create( body ); //It looks like this is asynchronous, so I will be handle it in the future 

  res.json( {
    message: 'Products created correctly',
    data: body
  } );

} );

router.get( '/', ( req, res ) => { //Read (List)
  res.json( products.read() );
} );

router.get( '/:id', ( req, res ) => { //Read (Show)
  const id = req.params.id;

  res.json( products.read( id ) );
} );

//---
module.exports = router;
