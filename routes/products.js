const express = require( 'express' );
const router = express.Router();

//--
const ProductServices = require( '../services/products' );
const products = new ProductServices();

        /* -- ROUTES -- */
router.use( express.json() ); //Middleware to manage the JSON


// --- Create ---
router.post( '/', ( req, res ) => {
  const body = req.body;

  const created = products.create( body );

  res.status( 201 ).json( created );
} );


// --- Read ---
router.get( '/', ( req, res ) => { //(List)
  const readed = products.read();

  res.json( readed );
} );

router.get( '/:id', ( req, res ) => { //(Show)
  const id = req.params.id;

  const readed = products.read( id );

  res.json( readed );
} );


// --- Update ---
router.put( '/:id', ( req, res ) => { //(Complete Update)
  const id = req.params.id;
  const body = req.body;

  const updatedProduct = products.update( id, body, 'put' );

  res.json( updatedProduct );
} );

router.patch( '/:id', ( req, res ) => { //(Partial Update)
  const id = req.params.id;
  const body = req.body;

  const updatedProduct = products.update( id, body, 'patch' );

  res.json( updatedProduct );
} );


// --- Delete ---
router.delete( '/:id', ( req, res ) => {
  const id = req.params.id;

  const deletedProduct = products.delete( id );

  res.json( deletedProduct );
} );


//--
module.exports = router;
