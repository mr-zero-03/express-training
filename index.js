const express = require( 'express' );
const app = express();

const host = 'localhost';
const port = 3000;

app.get( '/', ( req, res ) => {
  res.send( 'Hello World from Express!' );
} );

app.get( '/second-endpoint', ( req, res ) => {
  res.send( 'Welcome to the 2nd Endpoint!' );
} );

app.get( '/product/tshirt', ( req, res ) => {
  const product = {
    name: 'T-shirt',
    price: 2000,
    color: 'red'
  }

  res.json( product ); //Response with JSON
} );

//---
app.listen( port, host, () => {
  console.log( 'Listening on the port: "' + port + '"' );
} );
