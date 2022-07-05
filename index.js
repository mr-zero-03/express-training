const express = require( 'express' );
const app = express(); //appRouter - expressRouter - router
const apiRoutes = require( './routes' );

const logErrors = require( './middlewares/error_handler.js' ).logErrors;
const boomErrorHandler = require( './middlewares/error_handler.js' ).boomErrorHandler;
const errorHandler = require( './middlewares/error_handler.js' ).errorHandler;

//--
const host = 'localhost';
const port = 3000;
//--

app.get( '/', ( req, res ) => {
  res.send( 'Welcome World to my Tiendita from Express!' );
} );

apiRoutes( app ); //Routes manager

app.use( logErrors );
app.use( boomErrorHandler );
app.use( errorHandler );

//---
app.listen( port, host, () => {
  console.log( 'Listening on the port: "' + port + '"' );
} );
