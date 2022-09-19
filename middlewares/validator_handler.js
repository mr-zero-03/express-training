const boom = require( '@hapi/boom' );

function validatorHandler( schema, property ) {

  return( function ( req, res, next ) {
    const dataToValidate = req[ property ];
    const { error } = schema.validate( dataToValidate, { abortEarly: false } );

    if ( error ) {
      next( boom.badRequest( error ) );
    }

    next();
  } );

}

module.exports = validatorHandler;
