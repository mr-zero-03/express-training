const express = require( 'express' );
const router = express.Router();

//--
const ProductServices = require( '../services/products' );
const products = new ProductServices();

        /* -- ROUTES -- */
router.use( express.json() ); //Middleware to manage the JSON


// --- Create ---
router.post( '/', async( req, res ) => {
  const body = req.body;

  const created = await products.create( body );

  res.status( 201 ).json( created );
} );


// --- Read ---
router.get( '/', async( req, res ) => { //(List)
  const readed = await products.read();

  res.json( readed );
} );

router.get( '/:id', async( req, res ) => { //(Show)
  const id = req.params.id;

  const readed = await products.read( id );

  res.json( readed );
} );


// --- Update ---
router.put( '/:id', async( req, res ) => { //(Complete Update)
  const id = req.params.id;
  const body = req.body;

  const updatedProduct = await products.update( id, body, 'put' );

  res.json( updatedProduct );
} );

router.patch( '/:id', async( req, res ) => { //(Partial Update)
  const id = req.params.id;
  const body = req.body;

  const updatedProduct = await products.update( id, body, 'patch' );

  res.json( updatedProduct );
} );


// --- Delete ---
router.delete( '/:id', async( req, res ) => {
  const id = req.params.id;

  const deletedProduct = await products.delete( id );

  res.json( deletedProduct );
} );


//--
module.exports = router;
