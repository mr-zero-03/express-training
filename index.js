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



//---
app.listen( port, host, () => {
  console.log( 'Listening on the port: "' + port + '"' );
} );
