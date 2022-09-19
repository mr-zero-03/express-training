const express = require( 'express' );
const router = express.Router();

const validatorHandler = require( '../middlewares/validator_handler' );

//--
const ProductServices = require( '../services/products' );
const products = new ProductServices();

const schemas = require( '../schemas/product_schema' );

        /* -- ROUTES -- */
router.use( express.json() ); //Middleware to manage the JSON


// --- Create ---
router.post( '/',
  validatorHandler( schemas.createSchema, 'body' ),

  async( req, res, next ) => {
    try {

      const body = req.body;
      const created = await products.create( body );
      res.status( 201 ).json( created );

    } catch( err ) {
      next( err );
    }
  }

);


// --- Read ---
router.get( '/',
  validatorHandler( schemas.listSchema, 'query' ),

  async( req, res, next ) => { //(List)
    try {

      const readed = await products.read();
      res.json( readed );

    } catch( err ) {
      next( err );
    }
  }

);

router.get( '/:id',
  validatorHandler( schemas.getSchema, 'params' ),

  async( req, res, next ) => { //(Show)
    try {

      const id = req.params.id;
      const readed = await products.read( id );
      res.json( readed );

    } catch( err ) {
      next( err );
    }
  }

);


// --- Update ---
router.put( '/:id',
  validatorHandler( schemas.getSchema, 'params' ),
  validatorHandler( schemas.createSchema, 'body' ),

  async( req, res, next ) => { //(Complete Update)
  try {

    const id = req.params.id;
    const body = req.body;
    const updatedProduct = await products.update( id, body, 'put' );
    res.json( updatedProduct );

  } catch( err ) {
    next( err );
  }
} );

router.patch( '/:id',
  validatorHandler( schemas.getSchema, 'params' ),
  validatorHandler( schemas.updateSchema, 'body' ),

  async( req, res, next ) => { //(Partial Update)
    try {

      const id = req.params.id;
      const body = req.body;
      const updatedProduct = await products.update( id, body, 'patch' );
      res.json( updatedProduct );

    } catch( err ) {
      next( err );
    }
  }

);


// --- Delete ---
router.delete( '/:id',
  validatorHandler( schemas.getSchema, 'params' ),

  async( req, res, next ) => {
    try {

      const id = req.params.id;
      const deletedProduct = await products.delete( id );
      res.json( deletedProduct );

    } catch( err ) {
      next( err );
    }
  }

);


//--
module.exports = router;
