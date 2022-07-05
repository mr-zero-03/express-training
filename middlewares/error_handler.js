function logErrors( err, req, res, next ) {
  console.error( err );
  next( err );
}

function boomErrorHandler( err, req, res, next ) {
  if ( err.isBoom ) {
    const output = err.output;
    res.status( output.statusCode ).json( output.payload );
  } else {
    next( err );
  }
}

function errorHandler( err, req, res, next ) {
  res.status( 500 ).json( {
    statusCode: 500,
    message: 'An internal error occurred!'
    //message: err.message,
    //stack: err.stack
  } );
}

module.exports = {
  logErrors,
  boomErrorHandler,
  errorHandler
}
