const express = require( 'express' );
const cors = require( 'cors' );
const app = express(); //appRouter - expressRouter - router
const apiRoutes = require( './routes' );

const logErrors = require( './middlewares/error_handler.js' ).logErrors;
const boomErrorHandler = require( './middlewares/error_handler.js' ).boomErrorHandler;
const errorHandler = require( './middlewares/error_handler.js' ).errorHandler;

//--
const host = 'localhost';
const port = 3000;
//--

const whiteList = [
  'http://localhost',
  'https://api.mydomain.com'
];

const options = {
  origin: ( origin, callback ) => {
    if ( whiteList.includes( origin ) ) {
      callback( null, true );
    } else {
      callback( new Error( 'Not Allowed' ) );
    }
  }
};

//app.use( cors( options ) );
app.use( cors() );

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
