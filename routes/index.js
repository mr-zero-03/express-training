const baseRoute = '/api/v1';

const categoryRoutes = require( './categories' );
const productRoutes = require( './products' );

function apiRoutes( app ) {
  app.use( baseRoute + '/categories', categoryRoutes );
  app.use( baseRoute + '/products', productRoutes );
}

module.exports = apiRoutes;
