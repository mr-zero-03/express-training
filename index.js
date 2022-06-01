const express = require( 'express' );
const app = express();

const host = 'localhost';
const port = 3000;

//---
const products = require( './products' );
//---

app.get( '/', ( req, res ) => {
  res.send( 'Welcome World to my Tiendita from Express!' );
} );

//Products
app.post( '/products/', ( req, res ) => {
  const amount = req.query.amount;

  if ( !isNaN( parseInt( amount ) ) ) {
    products.create( amount );
  } else {
    products.create();
  }

  res.json( {
    message: 'Products created correctly'
  } );
} );

app.get( '/products/', ( req, res ) => {
  res.json( products.read() );
} );

app.get( '/products/:id', ( req, res ) => {
  const id = req.params.id;

  res.json( products.read( id ) );
} );

//---
app.listen( port, host, () => {
  console.log( 'Listening on the port: "' + port + '"' );
} );
