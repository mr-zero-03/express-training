const faker = require( 'faker' );

function randomAmount( min = 20, max = 100 ) {
  const randomNumber = Math.floor( Math.random() * ( max - min + 1 ) ) + min;
  return( randomNumber );
}

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
      amount = randomAmount();
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
