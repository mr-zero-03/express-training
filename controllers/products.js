//const faker = require( 'faker' );

const products = [];

/*function createProducts( amount ) { //Create (Multiple and random)
  const productsSize = products.length;
  for ( let i = 0; i < amount; i++ ) {
    products.push( {
      id: ( productsSize + i ),
      name: faker.commerce.productName(),
      price: parseInt( faker.commerce.price(), 10 ),
      image: faker.image.imageUrl()
    } );
  }

  return( products[ productsSize - 1 ] );
}*/

function createProduct( product ) { //Create (Receives JSON)
  const productsSize = products.length;

  products.push( {
    id: productsSize,
    name: product.name,
    price: product.price,
    image: product.image
  } );

  return( products[ productsSize ] );
}

module.exports = {

  create: function( product ) {
    /*if ( amount === 'random' ) {
      amount = faker.datatype.number( {
        'min': 20,
        'max': 100
      } );
    }*/

    createProduct( product );
  },

  read: function( id = null ) {
    if ( !isNaN( parseInt( id ) ) ) {
      return( products[ id ] );
    } else {
      return( products );
    }
  }

}
