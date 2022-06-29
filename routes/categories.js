const express = require( 'express' );
const router = express.Router();

//--
const categories = require( '../services/categories' );

//-- Routes
router.post( '/', ( req, res ) => { //Create
  const amount = req.query.amount;

  if ( !isNaN( parseInt( amount ) ) || amount === 'random' ) {
    categories.create( amount );
  } else {
    categories.create();
  }

  res.json( {
    message: 'Category created correctly'
  } );
} );

router.get( '/', ( req, res ) => { //Read (List)
  res.json( categories.read() );
} );

router.get( '/:id', ( req, res ) => { //Read (Show)
  const id = req.params.id;

  res.json( categories.read( id ) );
} );

//---
module.exports = router;
