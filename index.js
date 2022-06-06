const express = require( 'express' );
const app = express(); //appRouter - expressRouter - router
const apiRoutes = require( './routes' );


//--
const host = 'localhost';
const port = 3000;
//--

app.get( '/', ( req, res ) => {
  res.send( 'Welcome World to my Tiendita from Express!' );
} );

apiRoutes( app ); //Routes manager

//---
app.listen( port, host, () => {
  console.log( 'Listening on the port: "' + port + '"' );
} );
