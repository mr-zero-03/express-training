const express = require( 'express' );
const router = express.Router();

const path = require( 'path' );

const validatorHandler = require( '../middlewares/validator_handler' );

//--
const fileName = path.basename( __filename, '.js' );

const Services = require( '../services/' + fileName );
const service = new Services();

const schemas = require( '../schemas/' + fileName );

        /* -- ROUTES -- */
router.use( express.json() ); //Middleware to manage the JSON


// --- Create ---
router.post( '/',
  validatorHandler( schemas.create, 'body' ),

  async( req, res, next ) => {
    try {

      const body = req.body;
      const created = await service.create( body );
      res.status( 201 ).json( created );

    } catch( err ) {
      next( err );
    }
  }

);


// --- Read ---
router.get( '/', //(List)
  validatorHandler( schemas.list, 'query' ),

  async( req, res, next ) => {
    try {

      const readed = await service.read();
      res.json( readed );

    } catch( err ) {
      next( err );
    }
  }

);

router.get( '/:id', //(Show)
  validatorHandler( schemas.get, 'params' ),

  async( req, res, next ) => {
    try {

      const id = req.params.id;
      const readed = await service.read( id );
      res.json( readed );

    } catch( err ) {
      next( err );
    }
  }

);


// --- Update ---
router.put( '/:id', //(Complete Update)
  validatorHandler( schemas.get, 'params' ),
  validatorHandler( schemas.putUpdate, 'body' ),

  async( req, res, next ) => {
  try {

    const id = req.params.id;
    const body = req.body;
    const updated = await service.update( id, body, 'put' );
    res.json( updated );

  } catch( err ) {
    next( err );
  }
} );

router.patch( '/:id', //(Partial Update)
  validatorHandler( schemas.get, 'params' ),
  validatorHandler( schemas.patchUpdate, 'body' ),

  async( req, res, next ) => {
    try {

      const id = req.params.id;
      const body = req.body;
      const updated = await service.update( id, body, 'patch' );
      res.json( updated );

    } catch( err ) {
      next( err );
    }
  }

);


// --- Delete ---
router.delete( '/:id',
  validatorHandler( schemas.get, 'params' ),

  async( req, res, next ) => {
    try {

      const id = req.params.id;
      const deleted = await service.delete( id );
      res.json( deleted );

    } catch( err ) {
      next( err );
    }
  }

);


//--
module.exports = router;
