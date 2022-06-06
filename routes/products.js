const express = require( 'express' );
const router = express.Router();

//--
const products = require( '../controllers/products' );

//-- Routes
router.post( '/', ( req, res ) => { //Create
  const amount = req.query.amount;

  if ( !isNaN( parseInt( amount ) ) || amount === 'random' ) {
    products.create( amount );
  } else {
    products.create();
  }

  res.json( {
    message: 'Products created correctly'
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
