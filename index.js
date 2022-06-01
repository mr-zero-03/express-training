const express = require( 'express' );
const app = express();

const host = 'localhost';
const port = 3000;

//---
const products = [
  {
    name: 'T-shirt',
    price: 2000,
    color: 'red'
  },
  {
    name: 'Pants',
    price: 1000,
    color: 'gray'
  }
]
//---


app.get( '/', ( req, res ) => {
  res.send( 'Hello World from Express!' );
} );

//Categories
app.get( '/categories/:categoryId/subcategories/:subcategoryId', ( req, res ) => {
  const categoryId = req.params.categoryId;
  const subcategoryId = req.params.subcategoryId;

  res.json( {
    category: categoryId,
    subcategory: subcategoryId
  } ); //Response with JSON
} );

//Products
app.get( '/products/', ( req, res ) => {
  res.json( products ); //Response with JSON
} );

app.get( '/products/:id', ( req, res ) => {
  const id = req.params.id;

  res.json( products[ id ] ); //Response with JSON
} );

//Query Params
app.get( '/query-params', ( req, res ) => {
  const limit = req.query.limit;
  const offset = req.query.offset;

  if ( limit || offset ) {
    res.json( {
      limit: limit,
      offset: offset
    } );
  } else {
    res.send( 'Neither "limit" nor "offset" query parameters received!' );
  }

} );

//---
app.listen( port, host, () => {
  console.log( 'Listening on the port: "' + port + '"' );
} );
