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

// --- Create ---
router.post( '/', ( req, res ) => {
  const body = req.body;

  const createdProduct = products.create( body ); //It looks like this is asynchronous, so I will handle it in the future 

  res.status( 201 ).json( {
    message: 'Product created correctly',
    data: body
  } );

} );

// --- Read ---
router.get( '/', ( req, res ) => { //Read (List)
  res.json( products.read() );
} );

router.get( '/:id', ( req, res ) => { //Read (Show)
  const id = req.params.id;

  res.json( products.read( id ) );
} );

// --- Update ---
router.put( '/:id', ( req, res ) => { //Update (Complete Update)
  const id = req.params.id;
  const body = req.body;

  const updatedProduct = products.update( id, body, 'put' );

  res.json( {
    message: 'Product updated correctly',
    id: id,
    data: body
  } );

} );

router.patch( '/:id', ( req, res ) => { //Update (Partial Update)
  const id = req.params.id;
  const body = req.body;

  const updatedProduct = products.update( id, body, 'patch' );

  res.json( {
    message: 'Product updated correctly',
    id: id,
    data: body
  } );

} );

// --- Delete ---
router.delete( '/:id', ( req, res ) => { //Update (Partial Update)
  const id = req.params.id;

  const deletedProduct = products.delete( id );

  res.json( {
    message: 'Product deleted correctly',
    id: id,
  } );

} );

//---
module.exports = router;
