const express = require( 'express' );

const apiRoute = '/api';

const categoryRoutes = require( './categories' );
const productRoutes = require( './products' );

function apiRoutes( app ) {
  const v1Router = express.Router();

  app.use( apiRoute + '/v1', v1Router );
  v1Router.use( '/categories', categoryRoutes );
  v1Router.use( '/products', productRoutes );
}

module.exports = apiRoutes;
