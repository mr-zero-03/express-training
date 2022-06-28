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

function updateProduct( id, data, type ) {

  if ( products[ id ] === undefined ) {
    return( 'The product with the id:' + id + ' does not exists' );
  }

  if ( type === 'put' ) {
    products[ id ] = data;
  } else if ( type === 'patch' ) {
    products[ id ] = {
      ...products[ id ],
      ...data
    }
  }

  return( products[ id ] );
}

function deleteProduct( id ) {
  products[ id ] = undefined;
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
  },

  update: function( id, data, type = 'patch' ) {
    updateProduct( id, data, type );
  },

  delete: function( id ) {
    deleteProduct( id );
  }

}
