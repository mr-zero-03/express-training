const express = require( 'express' );
const app = express();

const host = 'localhost';
const port = 3000;

app.get( '/', ( req, res ) => {
  res.send( 'Hello World from Express!' );
} );

app.listen( port, host, () => {
  console.log( 'Listening on the port: "' + port + '"' );
} );
