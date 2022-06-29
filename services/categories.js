const faker = require( 'faker' );

const products = [];

function createProducts( amount ) {
  const productsSize = products.length;
  for ( let i = 0; i < amount; i++ ) {
    products.push( {
      id: ( productsSize + i ),
      name: faker.commerce.productName(),
      price: parseInt( faker.commerce.price(), 10 ),
      image: faker.image.imageUrl()
    } );
  }
}

module.exports = {

  create: function( amount = 1 ) {
    if ( amount === 'random' ) {
      amount = faker.datatype.number( {
        'min': 1,
        'max': 10
      } );
    }

    createProducts( amount );
  },

  read: function( id = null ) {
    if ( !isNaN( parseInt( id ) ) ) {
      return( products[ id ] );
    } else {
      return( products );
    }
  }

}
